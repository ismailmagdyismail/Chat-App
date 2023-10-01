import {Message} from "../models/messageModel";

export interface IMessageDataAccess{
    getMessageById(id:string):Promise<Message|null>
    getMessagesByConversation(conversationId:string):Promise<Message[]|null>
    createMessage(message:Message):Promise<Message|null>
    deleteMessage(id:string):Promise<void>
}