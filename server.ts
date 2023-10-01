import app from "./app";
import dotenv from "dotenv";
import MySqlDatabase from "./database/MySql/MySqlDatabase";
import IDatabase from "./database/IDatabase";
import {IDataAccess} from "./dataAccess/IDataAccess";
import SqlDataAccess from "./dataAccess/MySql/sqlDataAccess";
import {IEncryption} from "./services/encryptionServices/IEncryption";
import {INotification} from "./services/notificationServices/INotification";
import {MockEncryption} from "./services/encryptionServices/mockEncryption";
import {notificationServiceFactory} from "./services/notificationServices/notificationServiceFactory";

dotenv.config();
class Server{
    private readonly PORT:string ;
    private readonly database:IDatabase;
    private readonly dataAccess:IDataAccess;
    private readonly encryptionService:IEncryption;
    private readonly notificationService:INotification;
    private readonly secretKey:string;
    /**
     * Add data Access layer attribute and getter to be used by all services and controllers like singleton
     * to be used in an abstract high level way to avoid coupling the services to a certain access layer
     */

    constructor(PORT:string, database:IDatabase,dataAccess:IDataAccess, encryptionService:IEncryption,
                notificationService:INotification,secretKey:string) {
        this.PORT = PORT;
        this.database = database;
        this.dataAccess = dataAccess;
        this.encryptionService = encryptionService;
        this.notificationService = notificationService;
        this.secretKey = secretKey;
    }
     getDataAccessLayer():IDataAccess{
        return this.dataAccess;
    }
    getEncryptionService():IEncryption{
        return this.encryptionService;
    }
    getNotificationService():INotification{
        return this.notificationService;
    }
    getSecretKey():string{
        return this.secretKey;
    }
    async startServer():Promise<any>{
       try {
           /**
            * Start connection upon starting the server to be able to user DB ,DAL by services
            * and avoid starting the connection , closing it for each query
            */
           await this.database.connect();
           app.listen(this.PORT, ():void => {
               if(process.env.ENVIROMENT === "dev"){
                   console.log(`Server started Listening at ${this.PORT}`);
               }
           });
       }catch (err){
           console.log((err as Error).message);
           process.exit(1);
       }
    }
}


/**
 * Could encapsulate DB , DataAccess Creation into a FACTORY!! ,Inject them into the server
 * Server has DataAccess , DB at an abstract / interface level to be used by the services polymorphically
 * Server is the entry point for accessing  DB , DataAccess . It is a singleton that has data that is shared across the app
 */

const HOST:string|undefined = process.env.DB_HOST ;
const USER:string|undefined = process.env.DB_USER;
const PASSWORD:string|undefined = process.env.DB_PASSWORD;
const DATABASE_NAME:string|undefined = process.env.DB_DATABASE_NAME;
const database:MySqlDatabase = new MySqlDatabase(HOST, USER, PASSWORD,DATABASE_NAME);
const dataAccess:IDataAccess = new SqlDataAccess(database);

const encryptionService:IEncryption = new MockEncryption();
const notificationService:INotification = notificationServiceFactory(process.env.NOTIFICATION_SERVICE ?? "");

let secretKey:string|undefined = process.env.SECRET_KEY;
if(!secretKey){
    process.exit(1);
}
const server:Server = new Server(process.env.PORT || "8080" ,database,dataAccess,encryptionService,notificationService,secretKey);

server.startServer();
export default server;