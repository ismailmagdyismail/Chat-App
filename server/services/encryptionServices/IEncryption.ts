export interface IEncryption{
    encrypt(content:string):string;
    decrypt(content:string):string;
}
