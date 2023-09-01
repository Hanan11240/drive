import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { ViewFoldersComponent } from '../view-folders/view-folders.component';
import { SharedFilesComponent } from '../shared-files/shared-files.component';
import { DashboardService } from './dashboard.service';
import { FolderModel } from '../view-folders/models/folder';
import { Observable, tap } from 'rxjs';
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
 files=[1,2,3,4]
 constructor(private dashboardService:DashboardService,public dialog: MatDialog){}
 ngOnInit() {
  const userId = localStorage.getItem('userId')
 this.folders = this.dashboardService.getFolders(userId as string)
}


addFolder(){
const dialogRef=this.dialog.open(AddFolderComponent,{
  width:'400px'
})

    dialogRef.afterClosed().subscribe(result => {
     console.log(result)
    });
}
}
