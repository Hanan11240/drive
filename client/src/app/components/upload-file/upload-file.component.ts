import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';
import { FileModel } from '../view-files/models/FileModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  folderId!: string;
  uploaded = true;
  @Output() uploadedFiles = new EventEmitter<FileModel[]>();
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {
    route.queryParamMap.subscribe;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe({
      next: (params: any) => {
        this.folderId = params.get('folderId') || '';
      },
    });
  }
  uploadFiles(event: any) {
    this.uploaded = false;
    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append('file', event.target.files[i]);
    }
    const userId = localStorage.getItem('userId');
    this.dashboardService.uploadFiles(formData, userId as string,this.folderId).subscribe({
      next: (response: FileModel[]) => {
        this.uploaded = true;
        this.uploadedFiles.emit(response);
      },
    });
  }
}
