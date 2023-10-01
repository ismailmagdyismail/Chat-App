import {NextFunction, request, Request, Response} from "express";

//
// export class RequestLogger {
//     // private readonly level
//     constructor() {
//     }
// }

export function requestLogger(req:Request,res:Response,next:NextFunction){
    const start:number = Date.now();
    next();
    console.log(req.method,req.url,req.baseUrl,req.originalUrl,"=>",res.statusCode,Date.now() - start,"ms");
}