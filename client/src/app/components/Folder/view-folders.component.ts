import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FolderModel } from './models/folder';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FolderService } from './folder.service';
import { MatDialog } from '@angular/material/dialog';
import { RenameComponent } from 'src/app/utils/dialog/rename/rename.component';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedFilesService } from '../shared-files/shared-file.service';
@Component({
  selector: 'app-view-folders',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatMenuModule,MatButtonModule,RouterModule],
  templateUrl: './view-folders.component.html',
  styleUrls: ['./view-folders.component.scss']
})
export class ViewFoldersComponent {
@Input() folder!:FolderModel
@Output() deletedFolder = new EventEmitter<FolderModel>();
@Output() renamedFolder = new EventEmitter<{folderId:string,folderName:string}>();
isShared!:Observable<BehaviorSubject<boolean>>
constructor(private folderService:FolderService, public dialog: MatDialog,private sharedFiles:SharedFilesService){
  this.isShared = this.sharedFiles.isShared()
}

deleteFolder(folderDetails:FolderModel){
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
      this.folderService.deleteFolder(folderDetails).subscribe({
        next:(response:any)=>{
          this.deletedFolder.emit(folderDetails)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        },
        error:(error:any)=>{
    
        }
      })
     
    }
  })

}

renameFolder(folderId:string,folderName:string){
  
  this.folderService.renameFolder(folderId,folderName).subscribe({
    next:(response:any)=>{
      this.renamedFolder.emit({folderId,folderName})
    },error:(error:any)=>{
      
    }
  })
}
rename(folderDetails:FolderModel) {
  const dialogRef = this.dialog.open(RenameComponent, {
    width: '400px',
    data:folderDetails.folderName
  });
  dialogRef.afterClosed().subscribe((result: { folderName?: string }) => {
    const { folderName } = result;
    if (folderName) {
      this.renameFolder(folderDetails._id,folderName);
    }
  });
}
}
