import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { ViewFoldersComponent } from '../Folder/view-folders.component';
import { Observable } from 'rxjs';
import { FolderModel } from '../Folder/models/folder';
import { FileModel } from '../view-files/models/FileModel';
import { ActivatedRoute } from '@angular/router';
import { SharedFilesService } from './shared-file.service';

@Component({
  selector: 'app-shared-files',
  standalone: true,
  imports: [CommonModule, ViewFilesComponent, ViewFoldersComponent],
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.scss']
})
export class SharedFilesComponent {
  folders$!: Observable<FolderModel[]>;
  userId!: string;
  files$!: Observable<FileModel[]>;
  folderId?: string
  constructor(private route: ActivatedRoute,private sharedFiles:SharedFilesService) { }
  ngOnInit() {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.folderId = params.get('folderId') || undefined
        this.userId = localStorage.getItem('userId') as string;
        this.folders$ = this.sharedFiles.getSharedFolders(this.userId, this.folderId);
        this.files$ = this.sharedFiles.getSharedFiles(this.userId, this.folderId);
      }
    })
  }
}
