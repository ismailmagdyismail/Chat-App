import express, {Express, NextFunction, request, Request, Response} from 'express';
import server from "./server";
import {Message} from "./models/messageModel";
import userRouter from "./routes/userRoutes";
import conversationRouter from "./routes/conversationRoutes";
import messageRouter from "./routes/messageRoutes";
import {globalErrorHandler} from "./middleware/globalErrorHandlerMiddleware";
import {AppError} from "./errors/AppError";
import {requestLogger} from "./logger/requestLogger";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import * as morgan from "morgan";
const morgan = require('morgan');

const app:Express = express();
dotenv.config();

if(process.env.ENVIROMENT === "dev"){
    app.use(morgan('dev'));
    app.use(requestLogger);
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/users/',userRouter);
app.use('/api/v1/conversations/',conversationRouter);
app.use('/api/v1/messages/',messageRouter);


app.use((req:Request,res:Response,next:NextFunction):void=>{
    next(new AppError(404,"Route not defined"));
})
app.use(globalErrorHandler);
export default app;