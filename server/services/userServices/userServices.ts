import {User} from "../../models/userModel";
import server from "../../server";
import * as bcrypt from 'bcrypt'
import {AppError} from "../../errors/AppError";
import {IAuthenticationStrategy} from "../authenticationServices/IAuthenticationStrategy";

export async function signupService(user:User,authenticationService:IAuthenticationStrategy):Promise<string>{
    try {
        user.password = await bcrypt.hash(user.password,12);
        const createUser:User|null =  await server.getDataAccessLayer().createUser(user);
        if(!createUser){
            throw new AppError(400,"Cannot Create User");
        }
        return authenticationService.createToken(createUser.id!);
    } catch (err) {
        throw err;
    }
}

export async function loginService(user:User,authenticationService:IAuthenticationStrategy):Promise<string>{
    try {
        const storedUser:User|null =  await getUserByPhoneNumberService(user.phoneNumber);
        if(!storedUser){
            throw new AppError(400,"User doesn't Exist");
        }
        const isMatchingPassword:boolean = await bcrypt.compare(user.password,storedUser.password);
        if(!isMatchingPassword){
            throw new AppError(400,"Invalid Credentials");
        }
        return authenticationService.createToken(storedUser.id!);
    } catch (err) {
        throw err;
    }
}
export async function getUserPhoneService(userId:string):Promise<string|null>{
    const user:User|null = await getUserByIdService(userId);
    if(!user){
        return null;
    }
    return user.phoneNumber;
}
export async function getUserByPhoneNumberService(phoneNumber:string):Promise<User|null>{
    try {
        return server.getDataAccessLayer().getUserByPhoneNumber(phoneNumber);
    } catch (err){
        throw err;
    }
}
export async function getUserByIdService(userId:string):Promise<User|null>{
    try {
        return server.getDataAccessLayer().getUserById(userId);
    } catch (err) {
        throw err;
    }
}
