import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { ViewFoldersComponent } from '../view-folders/view-folders.component';
import { SharedFilesComponent } from '../shared-files/shared-files.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ViewFilesComponent,ViewFoldersComponent,SharedFilesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 folders =[1,2,3,4,6,7,8,9,10,11,12,13,14,15]
 files=[1,2,3,4]
}
