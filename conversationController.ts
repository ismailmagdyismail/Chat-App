import {Request, Response} from "express";
import {Conversation} from "../models/conversationModel";
import {
    createConversationService,
    getConversationService,
    getUserConversationsService
} from "../services/conversationServices/conversationServices";

export async function createConversationHandler(req:Request, res:Response):Promise<void>{
    const firstMemberPhoneNumber:string = req.body.firstMemberPhoneNumber;
    const secondMemberPhoneNumber:string = req.body.firstMemberPhoneNumber;
    if(!firstMemberPhoneNumber || !secondMemberPhoneNumber){
        res.status(400).json({
           status:"fail",
           message:"both users numbers must be provided"
        });
        return ;
    }
    const newConversation:Conversation|null= await createConversationService(firstMemberPhoneNumber,secondMemberPhoneNumber);
    res.status(200).json({
       status:"success",
       data:newConversation
    });
}

export async function getUserConversationsHandler(req:Request, res:Response):Promise<void>{
    const userId:string = req.params.userId;
    if(!userId){
        res.status(400).json({
            status:"fail",
            message:"ID must be provided"
        });
    }
    const conversations:Conversation[]|null = await getUserConversationsService(userId);
    res.status(200).json({
        status:"success",
        data:conversations
    });
}
export async function getConversationHandler(req:Request,res:Response):Promise<void>{
    const conversationId:string = req.params.conversationId;
    if(!conversationId){
        res.status(400).json({
            status:"fail",
            message:"ID must be provided"
        });
    }
    const conversation:Conversation|null = await getConversationService(conversationId);
    if(!conversation){
        res.status(404).json({
           status:"fail",
           message:`Conversation wit ID ${conversationId} does not exist`
        });
        return
    }
    res.status(200).json({
       status:"success",
       data:conversation
    });
}