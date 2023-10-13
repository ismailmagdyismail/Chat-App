import {ErrorHandler} from "../types/types";
import {NextFunction, Request, Response} from "express";
import {AppError} from "../errors/AppError";

export const globalErrorHandler:ErrorHandler=(err:Error, req:Request, res:Response, next:NextFunction):void=>{
    if(err instanceof AppError){
        res.status(err.getCode()).json({
            status:err.getStatus(),
            message:err.getMessage()
        });
        return;
    }
    res.status(500).json({
        status:"fail",
        message:"Internal Server Error"
    });

}