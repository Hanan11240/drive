import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FolderModel } from '../Folder/models/folder'; 
import {  shareReplay } from 'rxjs';
import { FileModel } from '../view-files/models/FileModel';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  uploadFiles(formData: FormData, userId: string,folderId?:string ) {
    return this.http.post<FileModel[]>(`${this.serverUrl}files/${userId}`,formData,{params:{folderId:folderId || ''}})
  }
  
  serverUrl = environment.serverUrl;
 
  constructor(private http: HttpClient) {}

  getFolders(userId: string,folderId?:string) {
    const folderType = folderId ? 'child-folders' : 'parent-folders'
    return this.http.get<FolderModel[]>(`${this.serverUrl}folders/${folderType}/${userId}`,{params:{folderId:folderId || ''}}).pipe(shareReplay());
  }

  addFolder(folderDetails:Omit<FolderModel, '_id'>){
   return this.http.post<FolderModel>(`${this.serverUrl}folders`,folderDetails)
  }

  getParentFiles(userId: string,FolderId?:string) {
    const fileType = FolderId ? 'child-files' : 'parent-files'
    return this.http.get<FileModel[]>(`${this.serverUrl}files/${fileType}/${userId}`,{params:{FolderId:FolderId || ''}}).pipe(shareReplay())
  }
  
}
