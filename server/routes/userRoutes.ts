import express, {NextFunction, Request, Response, Router} from "express";
import {loginHandler, signupHandler} from "../controllers/userController";
import conversationRouter from "./conversationRoutes";

const userRouter:Router = express.Router();

userRouter.use('/:userId/conversations',conversationRouter);

userRouter.post('/login',loginHandler);
userRouter.post('/signup',signupHandler);
// userRouter.post('/logout');


export default userRouter;