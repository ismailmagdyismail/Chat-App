import {Conversation} from "../models/conversationModel";

export interface IConversationDataAccess{
    getConversationById(id:string):Promise<Conversation>
    createConversation(conversation:Conversation):Promise<void>
}