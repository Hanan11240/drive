import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { ViewFoldersComponent } from '../Folder/view-folders.component';
import { SharedFilesComponent } from '../shared-files/shared-files.component';
import { DashboardService } from './dashboard.service';
import { FolderModel } from '../Folder/models/folder';
import { Observable, map, of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddFolderComponent } from 'src/app/utils/dialog/add-folder/add-folder.component';
import { FileModel } from '../view-files/models/FileModel';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ViewFilesComponent,
    ViewFoldersComponent,
    SharedFilesComponent,
    MatDialogModule,
    UploadFileComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  folders$!: Observable<FolderModel[]>;
  userId!: string;
  files$!: Observable<FileModel[]>;
  images: string[] = [];

  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.userId = localStorage.getItem('userId') as string;
    this.folders$ = this.dashboardService.getFolders(this.userId);
    this.files$ = this.dashboardService.getParentFiles(this.userId);
  }
  addFolderDialog() {
    const dialogRef = this.dialog.open(AddFolderComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: { folderName?: string }) => {
      const { folderName } = result;
      if (folderName) {
        this.addFolder(folderName);
      }
    });
  }

  addFolder(folderName: string) {
    const folderDetails: Omit<FolderModel, '_id'> = {
      userId: this.userId,
      folderName: folderName,
    };
    this.dashboardService.addFolder(folderDetails).subscribe({
      next: (response: FolderModel) => {
        this.folders$ = this.folders$.pipe(
          map((folders: FolderModel[]) => [...folders, response])
        );
      },
    });
  }
  updateFiles(event: FileModel[]) {
    this.files$.subscribe((currentFiles) => {
      // Combine the current files with the new ones from event
      const updatedFiles = [...(currentFiles || []), ...event];
      this.files$ = of(updatedFiles); // Update the files$ observable
    });
  }

  folderDeleted(folderDetails: FolderModel) {
    this.folders$ = this.folders$.pipe(
      map((folders: FolderModel[]) =>
        folders.filter((folder) => folder._id !== folderDetails._id)
      )
    );
  }

  renameFolder(folderDetails: { folderId: string; folderName: string }) {
    this.folders$ = this.folders$.pipe(
      map((folders: FolderModel[]) => {
        return folders.map((folder) =>
          folder._id === folderDetails.folderId
            ? { ...folder, folderName: folderDetails.folderName }
            : folder
        );
      })
    );
  }
  deleteFile(fileDetails: FileModel) {
    this.files$ = this.files$.pipe(
      map((files: FileModel[]) =>
        files.filter((file) => file.fileId  !== fileDetails.fileId)
      )
    );
  }
}
