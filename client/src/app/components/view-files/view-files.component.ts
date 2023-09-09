import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FileModel } from './models/FileModel';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from './service/file.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
      next: (params: ParamMap) => {
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
        this.fileService.previewOrDownloadFile(response, 'preview')
      }
    })
  }


  downloadFile(file: FileModel) {
    const { fileId } = file;
    this.fileService.downloadFile(fileId).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.fileService.previewOrDownloadFile(response, 'download')
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        // Handle the error as needed
      },
    });
  }

}
