import {Request, Response} from "express";
import {createUserService, getUserByPhoneService} from "../services/userServices/userServices";
import {User} from "../models/userModel";

/**
 *
 * Maybe make a separate SERVICES for LOGIN and SIGNUP which handles finding user and auth tokens
 * and make their CONTROLLERS just for PARSING
 *
 */
export async function signupHandler (req:Request, res:Response):Promise<void>{
    const user:User = {
        name:req.body.name,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
    }
    if (!user.name || !user.phoneNumber || !user.password){
        res.status(400).json({
            status:"fail",
            message:"all fields must be specified"
        });
        return;
    }
    const createdUser:User|null = await createUserService(user);
    /**
     * SEND JWT TOKEN TOOOO
     */
    res.status(201).json({
       status:"success",
       data:createdUser
    });
}

export async function loginHandler(req:Request, res:Response):Promise<void>{
    const user:User = {
        phoneNumber:req.body.phoneNumber,
        password:req.body.password,
        name:req.body.name,
    }
    const storedUser:User|null = await getUserByPhoneService(user.phoneNumber);
    if(!storedUser){
        res.status(404).json({
            status:"fail",
            message:"User Not found"
        });
        return;
    }
    res.status(200).json({
        status:"success",
        data:storedUser,
    });
    /**
     * SEND TOKEN
     */
}