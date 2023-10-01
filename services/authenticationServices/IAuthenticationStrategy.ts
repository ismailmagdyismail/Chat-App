export interface IAuthenticationStrategy{
    createToken(userId:string):string
    authenticate(token:string):Promise<string>
}
