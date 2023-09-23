import mysql, {Connection} from 'mysql2/promise';
import IDatabase from "../IDatabase";
import {User} from "../../models/userModel";

export default class MySqlDatabase implements IDatabase{
    private readonly host:string|undefined;
    private readonly user:string|undefined;
    private readonly password:string|undefined;
    private readonly database:string|undefined;
    private connection: Connection | undefined;

    constructor(host: string|undefined, user: string|undefined, password: string|undefined, database: string|undefined) {
        this.host = host;
        this.user =  user;
        this.password = password;
        this.database = database;
        this.connection = undefined;
    }
   async connect():Promise<any> {
       return this.connection = await mysql.createConnection({
           host: this.host,
           user: this.user,
           password: this.password,
           database: this.database,
       });
    }
    async disconnect():Promise<any> {
        if (this.connection) {
            await this.connection.end();
            this.connection = undefined;
        }
    }
    public getConnection():Connection|undefined{
        return this.connection;
    }
}