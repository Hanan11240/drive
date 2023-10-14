import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
@Injectable({
    providedIn:'root'
})
export class ErrorMessageService{

    errorMessage(error:any){
        console.log(error)
    }
}