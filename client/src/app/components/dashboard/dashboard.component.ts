import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { ViewFoldersComponent } from '../view-folders/view-folders.component';
import { SharedFilesComponent } from '../shared-files/shared-files.component';
import { DashboardService } from './dashboard.service';
import { FolderModel } from '../view-folders/models/folder';
import { Observable, map, scan, take, tap } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddFolderComponent } from 'src/app/utils/dialog/add-folder/add-folder.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ViewFilesComponent,ViewFoldersComponent,SharedFilesComponent,MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 folders!:Observable<FolderModel[]>
 userId!:string
 files=[1,2,3,4,5,6,7,8]
 constructor(private dashboardService:DashboardService,public dialog: MatDialog){}
 ngOnInit() {
   this.userId = localStorage.getItem('userId') as string
   this.folders = this.dashboardService.getFolders(this.userId).pipe(
  );
}


addFolderDialog(){
const dialogRef=this.dialog.open(AddFolderComponent,{
  width:'400px'
})
    dialogRef.afterClosed().subscribe((result:{folderName?:string}) => {
      const {folderName} = result
      if(folderName){
        this.addFolder(folderName)
      }
    });
}

addFolder(folderName:string){
  const folderDetails:Omit<FolderModel, '_id'>={
    userId:this.userId,
    folderName:folderName
  }
this.dashboardService.addFolder(folderDetails).subscribe({
  next:(response:FolderModel)=>{
    this.folders = this.folders.pipe(
      map((folders: FolderModel[]) => [...folders, response])
    );
  }
})
}
}
