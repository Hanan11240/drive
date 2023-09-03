import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { Observable } from 'rxjs';
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
constructor(private folderService:FolderService, public dialog: MatDialog){}

deleteFolder(folderDetails:FolderModel){
  
  this.folderService.deleteFolder(folderDetails).subscribe({
    next:(response:any)=>{
      console.log(response)
    },
    error:(error:any)=>{

    }
  })
}

renameFolder(folderId:string,folderName:string){
  
  this.folderService.renameFolder(folderId,folderName).subscribe({
    next:(response:any)=>{
 
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
