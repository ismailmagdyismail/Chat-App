import {IDataAccess} from "../IDataAccess";
import {User} from "../../models/userModel";
import {Message} from "../../models/messageModel";
import {Conversation} from "../../models/conversationModel";
import MySqlDatabase from "../../database/MySql/MySqlDatabase";
import {AppError} from "../../errors/AppError";
import App from "../../app";

export default class SqlDataAccess implements IDataAccess{
    /**
     *
     * THIS MIGHT NOT WORK AND BE UNDEFINED CAUSE DATABASE MUST BE RUN FIRST WHICH IS BAD DESIGN I THINK
     * THIS MIGHT BE AVOIDED IF WE SIMPLY DON'T CREATE ATTRIBUTE BUT THAT IS JUST HIDING THE PROBLEM OF PROCEDURAl DEPendancy
     * IF IT IS FUNCTIONAL (DEPNDING ON INPUTS ONLY IT WOULD SOLVE IT) ,BUTTT SERVICES WONT USE IT POLYMORPHICALLY
     * private connection:Connection;
     */
    constructor(database:MySqlDatabase) {
        this.dataBase = database as MySqlDatabase;
    }
    async getUserById(id: string): Promise<User|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT id,name,phone_number,password FROM users WHERE id = ?",[id]);
            if (rows.length) {
                return {
                    id: rows[0].id,
                    name: rows[0].name,
                    phoneNumber: rows[0].phone_number,
                    password: rows[0].password,
                };
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err);
        }
    }
    async getUserByPhoneNumber(phoneNumber: string): Promise<User|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute
            ("SELECT id,name,phone_number,password FROM users WHERE phone_number = ?",[phoneNumber]);
            if(rows.length){
                return {
                    id: rows[0].id,
                    name: rows[0].name,
                    phoneNumber: rows[0].phone_number,
                    password: rows[0].password,
                };
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err);
        }
    }
    async createUser(user: User): Promise<User|null> {
        try {
            await this.dataBase.getConnection()!.execute
            ("INSERT INTO users (name, phone_number, password) values (?,?,?)",[user.name,user.phoneNumber,user.password]);
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT id,name,phone_number,password FROM users ORDER BY id DESC LIMIT 1");
            if(rows.length){
                return {
                    id: rows[0].id,
                    name: rows[0].name,
                    phoneNumber: rows[0].phone_number,
                    password: rows[0].password,
                };
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err);
        }
    }
    async getConversationById(id: string): Promise<Conversation|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM conversations WHERE id = ?",[id]);
            if(rows.length) {
                return {
                    id:rows[0].id,
                    firstMemberId:rows[0].member_1,
                    secondMemberId:rows[0].member_2,
                };
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err);
        }
    }
    async createConversation(conversation: Conversation): Promise<Conversation|null> {
        try {
            await this.dataBase.getConnection()!.execute
            ("INSERT INTO conversations (member_1,member_2) values(?,?)",[conversation.firstMemberId,conversation.secondMemberId]);
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM conversations ORDER BY id DESC LIMIT 1");
            if(rows.length){
                return {
                  id:rows[0].id,
                  firstMemberId:rows[0].member_1,
                  secondMemberId:rows[0].member_2,
                };
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err );
        }
    }
    async getUserConversations(id: string): Promise<Conversation[]|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM conversations WHERE member_1 = ? OR member_2 = ?",[id,id]);
            if(rows.length){
                return rows.map((row:any) =>{
                    return  {
                        id:row.id,
                        firstMemberId:row.member_1,
                        secondMemberId:row.member_2,
                    };
                });
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err );
        }
    }
    async deleteConversation(id:string):Promise<void>{
        try {
            console.log("DONE");
            await this.dataBase.getConnection()!.execute("DELETE FROM conversations WHERE id = ?",[id]);
        }catch (err){
            throw this.getDatabaseError(err);
        }
    }
    async getMessageById(id: string): Promise<Message|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM messages WHERE id = ?",[id]);
            if(rows.length){
                return {
                    id:rows[0].id,
                    conversationId:rows[0].conversation_id,
                    sentBy:rows[0].send_by,
                    content:rows[0].content,
                };
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err );
        }
    }
    async getMessagesByConversation(conversationId: string): Promise<Message[]|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute
            ("SELECT * FROM messages WHERE conversation_id = ?",[conversationId]);
            if(rows.length){
                return rows.map((row:any)=>{
                    return{
                        id:row.id,
                        conversation_id:row.conversation_id,
                        sent_by:row.sent_by,
                        content:row.content,
                    };
                });
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err );
        }
    }
    async createMessage(message: Message): Promise<Message|null> {
        try {
            await this.dataBase.getConnection()!.execute
            ("INSERT INTO messages (content,sent_by,conversation_id) values(?,?,?)",[message.content,message.sentBy,message.conversationId]);
            const [rows]:any = await this.dataBase.getConnection()!.execute("SELECT * FROM messages ORDER BY id DESC LIMIT 1");
            if (rows.length){
                return {
                    id:rows[0].id,
                    conversationId:rows[0].conversation_id,
                    sentBy:rows[0].send_by,
                    content:rows[0].content,
                };
            }
            return null;
        } catch (err){
            throw this.getDatabaseError(err);
        }
    }
    async deleteMessage(id:string):Promise<void>{
        try {
            await this.dataBase.getConnection()!.execute("DELETE FROM messages WHERE id = ?",[id])
        } catch (err){
            throw this.getDatabaseError(err);
        }
    }
    private getDatabaseError(err:any):AppError{
        if(err.code === "ER_DUP_ENTRY"){
            return new AppError(400,"Duplicate data")
        }
        else if (err.code === "ER_NO_DEFAULT_FOR_FIELD"){
            return new AppError(400,"Missing data");
        }
        else if(err.code == "ER_NO_REFERENCED_ROW_2"){
            return new AppError(400,"Entity Doesn't exist");
        }
        return new AppError(500,"DB ERROR");
    }

    private dataBase :MySqlDatabase;
    // private error ={
    //     "ER_DUP_ENTRY":new AppError("fail","400","Duplicate data"),
    //     "ER_PARSE_ERROR":new AppError("fail","500","Query Error / Invalid Query"),
    //     "ER_NO_DEFAULT_FOR_FIELD":new AppError("fail","400","Missing data"),
    // }
}
