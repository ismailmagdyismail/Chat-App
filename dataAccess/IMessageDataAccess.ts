import {Message} from "../models/messageModel";

export interface IMessageDataAccess{
    getMessageById(id:string):Promise<Message>
    getMessagesByConversation(conversationId:string):Promise<Message[]>
    createMessage(message:Message):Promise<void>
}