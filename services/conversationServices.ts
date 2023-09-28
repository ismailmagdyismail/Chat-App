import {Conversation} from "../../models/conversationModel";
import server from "../../server";
import {User} from "../../models/userModel";
import {getUserByPhoneService} from "../userServices/userServices";


export async function getUserConversationsService(userId:string):Promise<Conversation[]|null>{
    try {
        return await server.getDataAccessLayer().getUserConversations(userId);
    } catch (err) {
        throw err;
    }
}
export async function getConversationService(conversationId:string):Promise<Conversation|null>{
    try {
        return await server.getDataAccessLayer().getConversationById(conversationId);
    } catch (err) {
        throw err;
    }
}
export async function createConversationService(firstMemberPhoneNumber: string, secondMemberPhoneNumber: string): Promise<Conversation | null> {
    try {
        const firstUser: User | null = await getUserByPhoneService(firstMemberPhoneNumber);
        const secondUser: User | null = await getUserByPhoneService(secondMemberPhoneNumber);
        if (!firstUser || !secondUser) {
            throw new Error(`Phone Number ${!firstUser && firstMemberPhoneNumber} ${!secondUser && secondMemberPhoneNumber} doesn't exist`);
        }
        const conversation: Conversation = {
            firstMemberId: firstUser.id!,
            secondMemberId: secondUser.id!
        }
        return await server.getDataAccessLayer().createConversation(conversation);
    } catch (err) {
        throw err;
    }
}

export async function deleteConversationService(conversationId:string):Promise<void>{
    try {
        await server.getDataAccessLayer().deleteConversation(conversationId);
    } catch (err) {
        throw err;
    }
}