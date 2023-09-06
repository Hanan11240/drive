import { Injectable } from '@angular/core';
import { FileModel } from '../models/FileModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
}
