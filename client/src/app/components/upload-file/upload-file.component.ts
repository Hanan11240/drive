import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';
import { FileModel } from '../view-files/models/FileModel';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  uploaded=true
  @Output() uploadedFiles = new EventEmitter<FileModel[]>();
  constructor(private dashboardService:DashboardService){}
  uploadFiles(event:any){
    this.uploaded=false
    const formData = new FormData()
    for (let i=0;i<event.target.files.length ; i++){
      formData.append('file',event.target.files[i])
    }
    const userId = localStorage.getItem('userId')
    this.dashboardService.uploadFiles(formData,userId as string).subscribe({
      next:(response:FileModel[])=>{
        this.uploaded=true
        this.uploadedFiles.emit(response)
        
      }
    })
  }
}
