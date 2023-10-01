import {User} from "../models/userModel";

export interface IUserDataAccess{
    getUserById(id:string):Promise<User|null>;
    getUserByPhoneNumber(phoneNumber:string):Promise<User|null>;
    createUser(user:User):Promise<User|null>;
}