import {NextFunction, Request, Response} from "express";

export type Handler = (req: Request, res: Response,next:NextFunction) => Promise<void>;
export type ErrorHandler = (err:Error, req: Request, res: Response, next:NextFunction) => void;
