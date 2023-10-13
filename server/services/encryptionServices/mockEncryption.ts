import {IEncryption} from "./IEncryption";

/**
 * For testing Purposes
 */
export class MockEncryption implements IEncryption{
    encrypt(content: string): string {
        return content;
    }
    decrypt(content: string): string {
        return content;
    }
}