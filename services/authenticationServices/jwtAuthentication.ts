import {IAuthenticationStrategy} from "./IAuthenticationStrategy";
import {AppError} from "../../errors/AppError";
import server from "../../server";
import {User} from "../../models/userModel";
import {getUserByIdService} from "../userServices/userServices";
import * as jwt from "jsonwebtoken";

export class JwtAuthentication implements IAuthenticationStrategy{
    createToken(userId:string):string{
        return jwt.sign({id:userId},server.getSecretKey(),{
            expiresIn:process.env.EXPIRES_IN || '1d',
        });
    }
    async authenticate(token:string):Promise<string> {
        const decodedData:any = await this.verifyToken(token,server.getSecretKey());
        const id:string = decodedData.id;
        if(!id){
            throw new AppError(401,"userId not provided in the token");
        }
        const user:User|null = await getUserByIdService(id);
        if(!user){
            throw new AppError(401,"User has been deleted");
        }
        return "JWT";
    }
    private async verifyToken(token:string,secretKey:string){
        return new Promise((resolve ,reject)=>{
            jwt.verify(token,secretKey,(err,decoded)=>{
                if(err){
                    reject(new AppError(401,(err as any).message));
                }
                else{
                    resolve(decoded);
                }
            });
        })
    }
}
