import { Injectable } from '@angular/core';
import { FileModel } from '../models/FileModel';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {
serverUrl = environment.serverUrl
  constructor(private http:HttpClient) { }


  deleteFile(fileDetails:FileModel,userId:string,folderId?:string){
    const {fileId} = fileDetails
    return this.http.delete(`${this.serverUrl}files/delete/${fileId}/${userId}`,{params:{folderId:folderId || ''}})
  }
  viewFile(fileId:string):Observable<HttpResponse<Blob>>{
    return this.http.get(`${this.serverUrl}files/${fileId}`,{responseType:'blob',observe:'response'})
  }
  downloadFile(fileId:string):Observable<HttpResponse<Blob>>{
    return this.http.get(`${this.serverUrl}files/download/${fileId}`,{responseType:'blob',observe:'response'})
  }
}
