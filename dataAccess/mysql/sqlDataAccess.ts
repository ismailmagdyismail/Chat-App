import {IDataAccess} from "../IDataAccess";
import {User} from "../../models/userModel";
import {Message} from "../../models/messageModel";
import {Conversation} from "../../models/conversationModel";
import MySqlDatabase from "../../database/MySql/MySqlDatabase";

export default class SqlDataAccess implements IDataAccess{
    private dataBase :MySqlDatabase;
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
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT name,phone_number FROM users WHERE id = ?",[id]);
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
            throw err;
        }
    }
    async getUserByPhoneNumber(phoneNumber: string): Promise<User|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute
            ("SELECT name,phone_number FROM users WHERE phone_number = ?",[phoneNumber]);
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
            throw err;
        }
    }
    async createUser(user: User): Promise<User|null> {
        try {
            await this.dataBase.getConnection()!.execute
            ("INSERT INTO users (name, phone_number, password) values (?,?,?)",[user.name,user.phoneNumber,user.password]);
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT name,phone_number FROM users ORDER BY id DESC LIMIT 1");
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
            throw err;
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
            throw err;
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
            throw err;
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
            throw err;
        }
    }
    async getMessageById(id: string): Promise<Message|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM messages WHERE id = ?",[id]);
            if(rows.length){
                return {
                    id:rows[0].id,
                    conversation_id:rows[0].conversation_id,
                    sent_by:rows[0].send_by,
                    content:rows[0].content,
                };
            }
            return null;
        } catch (err){
            throw err;
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
                        send_by:row.send_by,
                        content:row.content,
                    };
                });
            }
            return null;
        } catch (err){
            throw err;
        }
    }
    async createMessage(message: Message): Promise<Message|null> {
        try {
            await this.dataBase.getConnection()!.execute
            ("INSERT INTO messages (content,sent_by,conversation_id) values(?,?,?)",[message.content,message.sent_by,message.conversation_id]);
            const [rows]:any = await this.dataBase.getConnection()!.execute("SELECT * FROM messages ORDER BY id DESC LIMIT 1");
            if (rows.length){
                return {
                    id:rows[0].id,
                    conversation_id:rows[0].conversation_id,
                    sent_by:rows[0].send_by,
                    content:rows[0].content,
                };
            }
            return null;
        } catch (err){
            throw err;
        }
    }
}