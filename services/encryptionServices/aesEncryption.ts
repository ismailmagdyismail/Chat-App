import {IEncryption} from "./IEncryption";

export class AESEncryption implements IEncryption{
    encrypt(content:string): string {
        // const algorithm:string = 'aes-256-cbc';
        // const key = randomBytes(32); // 256 bits
        // const iv = randomBytes(16);  // 128 bits
        //
        // const cipher = createCipheriv(algorithm, key, iv);
        //
        // let encryptedText = cipher.update('Hello, World!', 'utf-8', 'hex');
        // encryptedText += cipher.final('hex');
        return "";
    }
    decrypt(content:string): string {
        return "";
    }
}