import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FolderModel, ShareFolderModel } from './models/folder';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FolderService } from './folder.service';
import { MatDialog } from '@angular/material/dialog';
import { RenameComponent } from 'src/app/utils/dialog/rename/rename.component';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedFilesService } from '../shared-files/shared-file.service';
import { ShareDialogComponent } from 'src/app/utils/dialog/share-dialog/share-dialog.component';
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
isShared!:boolean
shared?:boolean
constructor(private folderService:FolderService, public dialog: MatDialog,private sharedFiles:SharedFilesService,private route:ActivatedRoute){
this.sharedFiles.isShared$.subscribe({
  next:(value:boolean)=>{
    this.isShared = value
  }
})
this.route.queryParamMap.subscribe({
  next:(params:ParamMap)=>{
    this.shared = !!params.get('shared') || undefined
  }
})
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
shareFolder(folder:FolderModel){

  const dialogRef = this.dialog.open(ShareDialogComponent,{
    width:'500px',
    height:'500px',
    data:folder,
    disableClose:true
  })
  dialogRef.afterClosed().subscribe({
    next:(data:{ data:{shareWith: string[] }| null} )=>{
      if(data.data !== null){
        const shareFolderModel:ShareFolderModel= {sharedWith:data?.data?.shareWith,folderId:folder._id,ownerId:localStorage.getItem('userId') || ''}
        this.share(shareFolderModel)
      }
    
    }
  })
}

share(shareFolder:ShareFolderModel){
this.folderService.shareFolder(shareFolder).subscribe({
  next:(response:any)=>{

  }
})
}
}
