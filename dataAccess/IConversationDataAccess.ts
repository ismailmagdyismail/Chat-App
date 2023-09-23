import {Conversation} from "../models/conversationModel";

export interface IConversationDataAccess{
    getConversationById(id:string):Promise<Conversation|null>
    createConversation(conversation:Conversation):Promise<Conversation|null>
    getUserConversations(id:string):Promise<Conversation[]|null>
}