import {Conversation} from "../../models/conversationModel";
import server from "../../server";
import {User} from "../../models/userModel";
import {getUserByIdService, getUserByPhoneNumberService} from "../userServices/userServices";
import {AppError} from "../../errors/AppError";


export async function getUserConversationsService(userId:string):Promise<Conversation[]|null>{
    try {
        const user:User|null = await getUserByIdService(userId);
        if(!user){
            throw new AppError(404,`USER with ID ${userId} doesn't Exist`);
        }
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
export async function createConversationService(firstMemberPhoneNumber: string, secondMemberPhoneNumber: string): Promise<Conversation> {
    try {
        const [firstUser,secondUser]:[User|null,User|null] = await Promise.all([getUserByPhoneNumberService(firstMemberPhoneNumber),getUserByPhoneNumberService(secondMemberPhoneNumber)]);
        if (!firstUser || !secondUser) {
            throw new AppError(404,`Phone Number ${!firstUser && firstMemberPhoneNumber} ${!secondUser && secondMemberPhoneNumber} doesn't exist`);
        }
        const conversation: Conversation = {
            firstMemberId: firstUser.id!,
            secondMemberId: secondUser.id!
        }
        const newConversation = await server.getDataAccessLayer().createConversation(conversation);
        if(!newConversation){
            throw new AppError(500,"Error Creating new Conversation");
        }
        return newConversation
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
