import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Response ,Request} from "express";
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private logger = new Logger()
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp()

        const response = context.getResponse<Response>()
        const request = context.getRequest<Request>();
        const {originalUrl,method,body,query,params} = request;
        const userAgent = request.headers['user-agent'] || 'Unknown User-Agent';
        let error: unknown;
        let status: number = 500;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            error = exception.getResponse();
        } else {
            error = { mesage: (exception as Error).message }
        }
    
        this.logger.log({
            level: 'error',
            message: 'Error  Log',
            error: error,
            additionalInfo: {
                status: status,
                originalUrl:originalUrl,
                method:method,
                userAgent:userAgent,
                body:body,
                query:query,
                params:params
            }
        })

        response.status(status).json({ error: error })
    }
}