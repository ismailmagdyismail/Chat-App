import app from "./app";
import dotenv from "dotenv";
import MySqlDatabase from "./database/MySqlDatabase";
import IDatabase from "./database/IDatabase";

dotenv.config();
class Server{
    private readonly PORT:string ;
    private readonly database:IDatabase;

    /**
     * Add data Access layer attribute and getter to be used by all services and controllers like singleton
     * to be used in an abstract high level way to avoid coupling the services to a certain access layer
     */
    constructor(PORT:string,database:IDatabase) {
        this.PORT = PORT;
        this.database = database;
    }
    async startServer():Promise<any>{
       try {
           /**
            * Test connection before starting the server to ensure database exists and working
            */
           await this.database.connect();
           await this.database.disconnect();

           app.listen(this.PORT, () => {
               if(process.env.ENVIROMENT === "dev"){
                   console.log(`Server started Listening at ${this.PORT}`);
               }
           });
       }catch (err){
           console.log(err);
           process.exit(1);
       }
    }
}

const HOST:string|undefined = process.env.DB_HOST ;
const USER:string|undefined = process.env.DB_USER;
const PASSWORD:string|undefined = process.env.DB_PASSWORD;
const DATABASE_NAME:string|undefined = process.env.DB_DATABASE_NAME;

const database:IDatabase = new MySqlDatabase(HOST, USER, PASSWORD,DATABASE_NAME);

const server:Server = new Server(process.env.PORT || "8080" ,database);
server.startServer();
export default server;