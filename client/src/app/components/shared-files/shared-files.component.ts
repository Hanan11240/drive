import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { ViewFoldersComponent } from '../Folder/view-folders.component'; 

@Component({
  selector: 'app-shared-files',
  standalone: true,
  imports: [CommonModule,ViewFilesComponent,ViewFoldersComponent],
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.scss']
})
export class SharedFilesComponent {
  folders =[1,2,3,4,6,7,8,9,10,11,12,13,14,15]
  files=[1,2,3,4]
}
