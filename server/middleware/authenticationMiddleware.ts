import {NextFunction, Request, Response} from "express";
import {AppError} from "../errors/AppError";
import {Handler} from "../types/types";
import {asyncErrorHandler} from "./asyncErrorHandlerMiddleware";
import {JwtAuthentication} from "../services/authenticationServices/jwtAuthentication";


export const authenticationHandler:Handler = asyncErrorHandler(async(req:Request, res:Response, next:NextFunction):Promise<void>=>{
    let token:string|undefined = req.headers.authorization;
    if(!token){
        token = req.cookies.authToken;
    }
    if(!token || !token.startsWith("Bearer")){
        throw new AppError(401,"Auth token not provided");
    }
    await new JwtAuthentication().authenticate(token.split(' ')[1]);
    next();
});

