import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel, UserModel } from './model/user.model';
import { SuccessMessage } from 'src/app/utils/models/utilsModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  register(UserModel:UserModel){
    return this.http.post<SuccessMessage>('http://localhost:3000/auth/signUp',UserModel)
  }
  login(AuthModel:AuthModel){
    return this.http.post<{_id:string}>('http://localhost:3000/auth/login',AuthModel)
  }
}
