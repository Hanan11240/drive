import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn:'root'
})

export class SharedService {
    serverUrl = environment.serverUrl
    constructor(private http:HttpClient){}

    fetchUsers(searchText:string){
       return this.http.get<{email:string}[]>(`${this.serverUrl}share-files/users`,{params:{searchText}})
    }
}