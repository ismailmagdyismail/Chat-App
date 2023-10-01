import {NextFunction, Request, Response} from "express";
import {signupService, loginService} from "../services/userServices/userServices";
import {User} from "../models/userModel";
import {asyncErrorHandler} from "../middleware/asyncErrorHandlerMiddleware";
import {Handler} from "../types/types";
import {AppError} from "../errors/AppError";
import {JwtAuthentication} from "../services/authenticationServices/jwtAuthentication";

/**
 *
 * Maybe make a separate SERVICES for LOGIN and SIGNUP which handles finding user and auth tokens
 * and make their CONTROLLERS just for PARSING
 *
 */
export const signupHandler:Handler =
    asyncErrorHandler(async (req:Request, res:Response,next:NextFunction):Promise<void>=>{
    const user:User = {
        name:req.body.name,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
    }
    if (!user.name || !user.phoneNumber || !user.password){
        return next(new AppError(400,"all fields must be specified"));
    }
    const token:string = await signupService(user,new JwtAuthentication());
    res.status(201).json({
       status:"success",
       token
    });
});

export const loginHandler:Handler =
    asyncErrorHandler(async (req:Request, res:Response,next:NextFunction):Promise<void>=>{
    const user:User = {
        phoneNumber:req.body.phoneNumber,
        password:req.body.password,
        name:req.body.name,
    }
    if(!user.phoneNumber || !user.password){
        return next(new AppError(400,"phone number, password must be provided"));
    }
    const token:string = await loginService(user,new JwtAuthentication());
    res.status(200).json({
        status:"success",
        token
    });
});