export class AppError extends Error{
    private readonly code:number;
    constructor(code:number,message:string) {
        super(message);
        this.code = code;
    }
    getStatus():string{
        return String(this.code).startsWith("4") || String(this.code).startsWith("5") ? "fail":"success";
    }
    getCode():number{
        return this.code;
    }
    getMessage():string{
        return this.message;
    }
}
