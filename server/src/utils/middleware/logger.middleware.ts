import { NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";


export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger()
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, body, headers, } = req;
        const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';

        
        this.logger.log({
            level: 'info',
            message: 'Request Log',
            additionalInfo: {
                method,
                originalUrl,
                body,
                headers,
                userAgent
            },
        });
        let status: number;
        res.on('finish', () => {
            status = res.statusCode;

            // Log the outgoing response
            this.logger.log({
                level: 'info',
                message: 'Outgoing Response Log',
                additionalInfo: {
                    method,
                    originalUrl,
                    status,
                },
            });
        });

        // Continue with the request-response cycle
        next();
    }


}