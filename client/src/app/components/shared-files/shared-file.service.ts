import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FolderModel } from "../Folder/models/folder";
import { FileModel } from "../view-files/models/FileModel";


Injectable({
    providedIn:'root'
})

export class SharedFilesService{

    serverUrl = environment.serverUrl
    constructor(private http:HttpClient){}

    getSharedFiles(userId:string,folderId?:string){ 
        return this.http.get<FileModel[]>(`${this.serverUrl}share-files/${userId}`,{params:{folderId:folderId || ''}})
    }
    getSharedFolders(userId:string,folderId?:string){
        return this.http.get<FolderModel[]>(`${this.serverUrl}/${userId}`,{params:{folderId:folderId || ''}})
    }
}