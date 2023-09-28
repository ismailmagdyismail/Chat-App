import {User} from "../../models/userModel";
import server from "../../server";
import * as bcrypt from "bcrypt";

export async function createUserService(user:User):Promise<User|null>{
    // user.password = await bcrypt.hash(user.password,12);
    try {
        return await server.getDataAccessLayer().createUser(user);
    } catch (err) {
        throw err;
    }
}
export async function getUserByIdService(userId:string):Promise<User|null>{
    try {
        return await server.getDataAccessLayer().getUserById(userId);
    } catch (err) {
        throw err;
    }
}
export async function getUserByPhoneService(phoneNumber:string):Promise<User|null>{
    try {
        return await server.getDataAccessLayer().getUserByPhoneNumber(phoneNumber);
    } catch (err) {
        throw err;
    }
}
