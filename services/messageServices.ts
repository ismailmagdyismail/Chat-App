import {Message} from "../../models/messageModel";
import server from "../../server";
import {AppError} from "../../errors/AppError";
import {getConversationService} from "../conversationServices/conversationServices";
import {Conversation} from "../../models/conversationModel";
import {getUserPhoneService} from "../userServices/userServices";
import {phoneNumbersFormatter} from "../../utils/phoneNumbersFormatter";

/**
 * Could pass Encryption Algorithm using DependencyInjection (DI)
 */
export async function getConversationMessagesServices(conversationId:string):Promise<Message[]|null>{
    try {
        const conversation:Conversation|null = await getConversationService(conversationId);
        if(!conversation){
            throw new AppError(404,`Conversation with ID ${conversationId} does not exist`);
        }
        const messages:Message[]|null = await server.getDataAccessLayer().getMessagesByConversation(conversationId);
        if(!messages){
            return null;
        }
       return messages.map((message:Message)=> {
            message.content = server.getEncryptionService().decrypt(message.content);
            return message;
        });
    } catch (err) {
        throw err;
    }
}
export async function getMessageByIdService(messageId:string):Promise<Message|null>{
    try {
        const message:Message|null = await server.getDataAccessLayer().getMessageById(messageId);
        if(message){
            message.content = server.getEncryptionService().decrypt(message.content);
        }
        return message;
    } catch (err) {
        throw err;
    }
}
export async function sendMessageService(message:Message):Promise<Message>{
    try {
        message.content = server.getEncryptionService().encrypt(message.content);
        const createdMessage:Message|null = await server.getDataAccessLayer().createMessage(message);
        if(!createdMessage){
            throw new AppError(500,"Error Sending message");
        }
        const [from,conversation]:[string|null,Conversation|null] = await Promise.all([
            await getUserPhoneService(message.sentBy),
            await getConversationService(message.conversationId)
        ]);
        const to:string|null = conversation!.firstMemberId === message.sentBy ?
            await getUserPhoneService(conversation!.secondMemberId): await getUserPhoneService(conversation!.firstMemberId);
        server.getNotificationService().sendNotification(phoneNumbersFormatter(from!),phoneNumbersFormatter(to!),message.content)
        return createdMessage;
    } catch (err) {
        throw err;
    }
}

export async function deleteMessageService(messageId:string):Promise<null>{
    try {
        await server.getDataAccessLayer().deleteMessage(messageId);
        return null;
    } catch (err) {
        throw err;
    }
}