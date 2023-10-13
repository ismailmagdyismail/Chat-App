import {NextFunction, Request, Response} from "express";
import {Conversation} from "../models/conversationModel";
import {
    createConversationService,
    deleteConversationService,
    getConversationService,
    getUserConversationsService
} from "../services/conversationServices/conversationServices";
import {Handler} from "../types/types";
import {asyncErrorHandler} from "../middleware/asyncErrorHandlerMiddleware";
import {AppError} from "../errors/AppError";

export const createConversationHandler:Handler =
    asyncErrorHandler(async(req:Request, res:Response,next:NextFunction):Promise<void>=>{
    const firstMemberPhoneNumber:string = req.body.firstMemberPhoneNumber;
    const secondMemberPhoneNumber:string = req.body.secondMemberPhoneNumber;
    if(!firstMemberPhoneNumber || !secondMemberPhoneNumber){
        return next(new AppError(400,"both users numbers must be provided"));
    }
    const newConversation:Conversation = await createConversationService(firstMemberPhoneNumber,secondMemberPhoneNumber);
    res.status(201).json({
        status:"success",
        data:newConversation
    });
});

export const getUserConversationsHandler:Handler =
    asyncErrorHandler(async(req:Request, res:Response,next:NextFunction):Promise<void>=>{
    const userId:string = req.params.userId;
    if(!userId){
        return next(new AppError(400,"both users numbers must be provided"));
    }
    const conversations:Conversation[]|null = await getUserConversationsService(userId);
    res.status(200).json({
        status:"success",
        data:conversations ?? []
    });
});
export const getConversationHandler:Handler =
    asyncErrorHandler(async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const conversationId:string = req.params.conversationId;
    if(!conversationId){
        return next(new AppError(400,"Conversation ID must be provided"))
    }
    const conversation:Conversation|null = await getConversationService(conversationId);
    if(!conversation){
        return next(new AppError(404,`Conversation wit ID ${conversationId} does not exist`))
    }
    res.status(200).json({
       status:"success",
       data:conversation
    });
});

export const deleteConversationHandler:Handler =
    asyncErrorHandler(async (req:Request,res:Response):Promise<void>=>{
    const conversationId:string = req.params.conversationId;
    await deleteConversationService(conversationId);
    res.status(204).json({
       status:"success",
       data:null
    });
});
