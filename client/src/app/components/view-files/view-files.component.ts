import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FileModel } from './models/FileModel';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from './service/file.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedFilesService } from '../shared-files/shared-file.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/utils/dialog/share-dialog/share-dialog.component';

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
  isShared!:boolean
  constructor(private fileService: FileService, private route: ActivatedRoute,private sharedFiles:SharedFilesService,private dialog:MatDialog) { }

  ngOnInit() {
    this.sharedFiles.isShared$.subscribe((value: boolean) => {
      console.log(value)
      this.isShared = value;
    });
    console.log(this.isShared)
    this.userId = localStorage.getItem('userId') || ''
    this.route.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        this.folderId = params.get('folderId') || ''
      }
    })
  }

  deleteFile(file: FileModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileService.deleteFile(file, this.userId, this.folderId).subscribe({
          next: (response: any) => {
            this.fileDeleted.emit(file)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
       
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
  shareFiles(file:FileModel){

    const dialogRef = this.dialog.open(ShareDialogComponent,{
      width:'500px',
      height:'500px',
      data:file,
      disableClose:true
    })
      // const {_id } = folder
      // this.sharedFiles.shareFilesOrFolder(_id,undefined).subscribe({
      //   next:(response:any)=>{
  
      //   }
      // })
  }

}
