import { Injectable } from '@angular/core';
import { FolderModel, ShareFolderModel } from './models/folder';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FolderService {

  serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) {}

  deleteFolder(folderDetails: FolderModel) {
    const { userId, _id: folderId } = folderDetails;
    return this.http.delete(`${this.serverUrl}folders/${folderId}/${userId}`);
  }
  renameFolder(folderId:string,folderName:string) {
   const newName = {folderName:folderName} 
    return this.http.patch(`${this.serverUrl}folders/rename/${folderId}`,newName)
  } 
  shareFolder(shareFolder:ShareFolderModel){
    return this.http.post(`${this.serverUrl}share-files`,shareFolder)
  }
}
