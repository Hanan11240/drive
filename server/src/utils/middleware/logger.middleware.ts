import { NestMiddleware } from "@nestjs/common";
import { Request, Response,NextFunction } from "express";

export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`req:`,{headers:req.headers,body:req.body,originalUrl:req.originalUrl});

        next()
    }
}