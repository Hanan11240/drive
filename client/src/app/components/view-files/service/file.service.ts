import { Injectable } from '@angular/core';
import { FileModel, ShareFileModel } from '../models/FileModel';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  serverUrl = environment.serverUrl
  constructor(private http: HttpClient) { }


  deleteFile(fileDetails: FileModel, userId: string, folderId?: string) {
    const { fileId } = fileDetails
    return this.http.delete(`${this.serverUrl}files/delete/${fileId}/${userId}`, { params: { folderId: folderId || '' } })
  }
  viewFile(fileId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.serverUrl}files/${fileId}`, { responseType: 'blob', observe: 'response' })
    // return this.http.get('https://a391-122-161-242-12.ngrok-free.app/api/v1/drive/file-preview/6506009a1f30691c347a50ae',{responseType:'blob',observe:'response'})
  }
  downloadFile(fileId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.serverUrl}files/download/${fileId}`, { responseType: 'blob', observe: 'response' })
  }

  previewOrDownloadFile(response: HttpResponse<Blob>, type: 'preview' | 'download') {
    const contentDisposition = response.headers.get('content-disposition');
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].trim()
      : 'file'; // Default filename if not provided

    const contentType = response.headers.get('content-type');
    const responseBody = response.body;
    console.log(contentType)

    if (responseBody !== null && contentType !== null) {
      const blob = new Blob([responseBody], { type: 'video/mp4' });

      // Create a blob URL and open it in a new tab

      if (type === 'preview') {
        const blobUrl = window.URL.createObjectURL(blob);
        console.log('url',blobUrl)
        window.open(blobUrl, '_blank');

        // Clean up the blob URL when the tab is closed
        window.addEventListener('beforeunload', () => {
          window.URL.revokeObjectURL(blobUrl);
        });
      } else {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // Trigger the download
        link.click();

        // Clean up
        window.URL.revokeObjectURL(link.href);
      }

    } else {
      // Handle the case where either the response body or content type is null
      console.error('Response body or content type is null');
    }
  }
  shareFile(shareFile:ShareFileModel){
    return this.http.post(`${this.serverUrl}share-files`,shareFile)
  }
}
