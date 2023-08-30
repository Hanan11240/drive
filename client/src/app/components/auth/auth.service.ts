import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel, UserModel } from './model/user.model';
import { SuccessMessage } from 'src/app/utils/models/utilsModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = environment.serverUrl
  constructor(private http:HttpClient) { }


  register(UserModel:UserModel){
    return this.http.post<SuccessMessage>(`${this.serverUrl}auth/signUp`,UserModel)
  }
  login(AuthModel:AuthModel){
    return this.http.post<{_id:string}>(`${this.serverUrl}auth/login`,AuthModel)
  }
}
