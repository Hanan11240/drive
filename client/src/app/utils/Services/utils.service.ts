import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

 showNavBar$ = new BehaviorSubject<boolean>(true)
 showFooter$ = new BehaviorSubject<boolean>(true)
  constructor() { }


 
}
