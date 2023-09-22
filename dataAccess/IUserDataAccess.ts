import {User} from "../models/userModel";

export interface IUserDataAccess{
    getUserById(id:string):Promise<User>;
    getUserByPhoneNumber(phoneNumber:string):Promise<User>;
    createUser(user:User):Promise<void>;
}