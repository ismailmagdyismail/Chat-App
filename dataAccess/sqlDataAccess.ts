import {IDataAccess} from "../IDataAccess";
import {User} from "../../models/userModel";
import {Message} from "../../models/messageModel";
import {Conversation} from "../../models/conversationModel";
import MySqlDatabase from "../../database/MySql/MySqlDatabase";

export default class SqlDataAccess implements IDataAccess{
    private dataBase :MySqlDatabase;
    /**
     *
     * this MIGHT NOT WORK AND BE UNDEFINED CAUSE DATABASE MUST BE RUN FIRST WHICH IS BAD DESIGN I THINK
     * THIS MIGHT BE AVOIDED IF WE SIMPLY DON'T CREATE ATTRIBUTE BUT THAT IS JUST HIDING THE PROBLEM OF PROCEDURAl DEPendancy
     * IF IT IS FUNCTIONAL (DEPNDING ON INPUTS ONLY IT WOULD SOLVE IT) ,BUTTT SERVICES WONT USE IT POLYMORPHICALLY
     * private connection:Connection;
     */
    constructor(database:MySqlDatabase) {
        this.dataBase = database as MySqlDatabase;
    }
    async getUserById(id: string): Promise<User|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM users WHERE id = ?",[id]);
            if (rows.length) {
                return rows[0] as User;
            }
            return null;
        } catch (err){
            throw err;
        }
    }
    async getUserByPhoneNumber(phoneNumber: string): Promise<User|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute
            ("SELECT * FROM users WHERE phone_number = ?",[phoneNumber]);
            if(rows.length){
                return rows[0] as User;
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
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM users ORDER BY id LIMIT 1");
            if(rows.length){
                return rows[0];
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
                return rows[0];
            }
            return null;
        } catch (err){
            throw err;
        }
    }
    async createConversation(conversation: Conversation): Promise<Conversation|null> {
        try {
            await this.dataBase.getConnection()!.execute
            ("INSERT INTO conversation (member_1,member_2) values(?,?)",[conversation.firstMemberId,conversation.secondMemberId]);
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM conversation ORDER BY id LIMIT 1");
            if(rows.length){
                return rows[0];
            }
            return null;
        } catch (err){
            throw err;
        }
    }
    async getUserConversations(id: string): Promise<Conversation[]|null> {
        try {
            const [rows]:any[] = await this.dataBase.getConnection()!.execute("SELECT * FROM conversations WHERE member_1 = ? OR member_2 = ?",[id])
            if(rows.length){
                return rows as Conversation[];
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
                return rows[0];
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
                return rows;
            }
            return null;
        } catch (err){
            throw err;
        }
    }
    async createMessage(message: Message): Promise<Message|null> {
        try {
            await this.dataBase.getConnection()!.execute
            ("INSERT INTO messages (content,sent_by,conversation_id) values(?,?,?)",[message.content,message.send_by,message.conversation_id]);
            const [rows]:any = await this.dataBase.getConnection()!.execute("SELECT * FROM messages ORDER BY ID LIMIT 1");
            if (rows.length){
                return rows;
            }
            return null;
        } catch (err){
            throw err;
        }
    }
}