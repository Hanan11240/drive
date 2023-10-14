import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ErrorMessageService } from "../Services/error.message.service";
import Swal from 'sweetalert2';


@Injectable()
export class Interceptor implements HttpInterceptor{
    constructor(private errorService:ErrorMessageService){}
    intercept(request:HttpRequest<unknown>,next:HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(request).pipe(
            catchError((error) => {
                console.error('HTTP Error:', error);
                // Handle the error here, you can also use your error service or trigger Swal here.
                return throwError(error);
            })
        )
    }
}