import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FolderModel } from '../view-folders/models/folder';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  serverUrl = environment.serverUrl;
  constructor(private http: HttpClient) {}

  getFolders(userId: string) {
    return this.http.get<FolderModel[]>(`${this.serverUrl}folders/parent-folders/${userId}`);
  }

  addFolder(folderDetails:Omit<FolderModel, '_id'>){
   return this.http.post(`${this.serverUrl}folders`,folderDetails)
  }
}
