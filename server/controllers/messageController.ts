import {asyncErrorHandler} from "../middleware/asyncErrorHandlerMiddleware";
import {Handler} from "../types/types";
import {NextFunction, Request, Response} from "express";
import {
        deleteMessageService,
        getConversationMessagesServices,
        sendMessageService
} from "../services/messageServices/messageServices";
import {Message} from "../models/messageModel";
import {AppError} from "../errors/AppError";

export const getConversationMessagesHandler:Handler =
    asyncErrorHandler(async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const conversationId:string = req.params.conversationId;
    if(!conversationId){
        return (next(new AppError(400,"Conversation ID must be specified")));
    }
    const messages:Message[]|null = await getConversationMessagesServices(conversationId);
    res.status(200).json({
        status:"success",
        data:messages ?? [],
    });
});

export const sendMessageHandler:Handler =
    asyncErrorHandler(async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const message:Message = {
        content:req.body.content,
        conversationId:req.params.conversationId,
        sentBy:req.body.sentBy,
    }
    if(!message.content || !message.sentBy || !message.conversationId){
        return next(new AppError(400,"All message fields must be specified"))
    }
    const sentMessage:Message = await sendMessageService(message);
    res.status(200).json({
       status:"success",
       data:sentMessage
    });
});

export const deleteMessageHandler:Handler = asyncErrorHandler(async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
   const messageId:string = req.params.messageId;
   await deleteMessageService(messageId);
   res.status(200).json({
      status:"success",
      data:null,
   });
});