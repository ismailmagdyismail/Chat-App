import express, {Router} from "express";
import {
    createConversationHandler, deleteConversationHandler,
    getConversationHandler,
    getUserConversationsHandler
} from "../controllers/conversationController";
import messageRouter from "./messageRoutes";
import {authenticationHandler} from "../middleware/authenticationMiddleware";

const conversationRouter:Router = express.Router({
        mergeParams:true,
    }
);

conversationRouter.use('/:conversationId/messages',messageRouter);

conversationRouter.route('/')
    .get(authenticationHandler,getUserConversationsHandler)
    .post(authenticationHandler,createConversationHandler)

conversationRouter.route('/:conversationId')
    .get(authenticationHandler,getConversationHandler)
    .delete(authenticationHandler,deleteConversationHandler)

export default conversationRouter;
