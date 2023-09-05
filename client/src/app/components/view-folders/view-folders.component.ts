import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FolderModel } from './models/folder';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FolderService } from './folder.service';
import { MatDialog } from '@angular/material/dialog';
import { RenameComponent } from 'src/app/utils/dialog/rename/rename.component';
@Component({
  selector: 'app-view-folders',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatMenuModule,MatButtonModule],
  templateUrl: './view-folders.component.html',
  styleUrls: ['./view-folders.component.scss']
})
export class ViewFoldersComponent {
@Input() folder!:FolderModel
@Output() deletedFolder = new EventEmitter<FolderModel>();
@Output() renamedFolder = new EventEmitter<{folderId:string,folderName:string}>();
constructor(private folderService:FolderService, public dialog: MatDialog){}

deleteFolder(folderDetails:FolderModel){
  
  this.folderService.deleteFolder(folderDetails).subscribe({
    next:(response:any)=>{
      this.deletedFolder.emit(folderDetails)
    },
    error:(error:any)=>{

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
