import {NextFunction, Request, Response} from "express";
import {Handler} from "../types/types";

export function asyncErrorHandler(handler:Handler){
    return async function(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            await handler(req,res,next);
        } catch (err){
            next(err);
        }
    }
}