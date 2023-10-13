import express, {Router} from "express";
import {
    deleteMessageHandler,
    getConversationMessagesHandler,
    sendMessageHandler
} from "../controllers/messageController";
import app from "../app";
import {authenticationHandler} from "../middleware/authenticationMiddleware";

const messageRouter:Router = express.Router({
    mergeParams:true,
});

messageRouter.route('/')
    .get(authenticationHandler,getConversationMessagesHandler)
    .post(authenticationHandler,sendMessageHandler);
messageRouter.route('/:messageId')
    .delete(authenticationHandler,deleteMessageHandler)
//     .patch()
export default messageRouter;