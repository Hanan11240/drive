import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FileModel } from './models/FileModel';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from './service/file.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-files',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent {
  @Input() file!: FileModel
  @Output() fileDeleted = new EventEmitter<FileModel>()
  userId!: string
  folderId!: string
  constructor(private fileService: FileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || ''
    this.route.queryParamMap.subscribe({
      next: (params: any) => {
        this.folderId = params.get('folderId') || ''
      }
    })
  }

  deleteFile(file: FileModel) {
    this.fileService.deleteFile(file, this.userId, this.folderId).subscribe({
      next: (response: any) => {
        this.fileDeleted.emit(file)
      }
    })
  }

  viewFile(file: FileModel) {
    const { fileId } = file
    this.fileService.viewFile(fileId).subscribe({
      next: (response: HttpResponse<Blob>) => {
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].trim()
          : 'file'; // Default filename if not provided

        const contentType = response.headers.get('content-type');
        const responseBody = response.body;

        if (responseBody !== null && contentType !== null) {
          const blob = new Blob([responseBody], { type: contentType });

          // Create a blob URL and open it in a new tab
          const blobUrl = window.URL.createObjectURL(blob);
          window.open(blobUrl, '_blank');

          // Clean up the blob URL when the tab is closed
          window.addEventListener('beforeunload', () => {
            window.URL.revokeObjectURL(blobUrl);
          });
        } else {
          // Handle the case where either the response body or content type is null
          console.error('Response body or content type is null');
        }
      }
    })
  }


  downloadFile(file: FileModel) {
    const { fileId } = file;
    this.fileService.downloadFile(fileId).subscribe({
      next: (response: HttpResponse<Blob>) => {
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].trim()
          : 'file'; // Default filename if not provided
  
        const contentType = response.headers.get('content-type');
        const responseBody = response.body;
        if (responseBody !== null && contentType !== null) {
          const blob = new Blob([responseBody], { type: contentType });
  
          // Create a temporary link element to trigger the download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
  
          // Trigger the download
          link.click();
  
          // Clean up
          window.URL.revokeObjectURL(link.href);
        }
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        // Handle the error as needed
      },
    });
  }
  
}
