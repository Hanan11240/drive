import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileService } from '../view-files/service/file.service';
import { HttpResponse } from '@angular/common/http';
import { UtilService } from 'src/app/utils/Services/utils.service';

@Component({
  selector: 'app-shared-file-with-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-file-with-me.component.html',
  styleUrls: ['./shared-file-with-me.component.scss']
})
export class SharedFileWithMeComponent {
  folderId!: string | null;
  fileId!: string | null;
  constructor(private route:ActivatedRoute,private fileService:FileService,private utilsService:UtilService){
    this.utilsService.showNavBar$.next(false)
    this.utilsService.showFooter$.next(false)
  }

  ngOnInit(){
    this.route.queryParamMap.subscribe({
      next:(params:ParamMap)=>{
        this.folderId = params.get('folderId')
        this.fileId = params.get('fileId')
        this.folderId ? this.getFolder(this.folderId):this.getFile(this.fileId)
      }
    })
  }


  getFile(fileId:string | null){
    if(fileId)
    this.fileService.viewFile(fileId).subscribe({
      next: (response: HttpResponse<Blob>) => {
        // this.fileService.previewOrDownloadFile(response, 'preview')
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].trim()
          : 'file'; // Default filename if not provided
    
        const contentType = response.headers.get('content-type');
        const responseBody = response.body;
        if (responseBody !== null && contentType !== null) {
          const blob = new Blob([responseBody], { type: contentType });
        const blobUrl = window.URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.src = blobUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%'; // Adjust the height as needed
        document.body.appendChild(iframe);

        // Clean up the blob URL when the iframe is removed
        iframe.addEventListener('load', () => {
          window.URL.revokeObjectURL(blobUrl);
        });
        
        }
      }
    })
  }

  getFolder(folderId:string){}

  ngOnDestroy() {
    this.utilsService.showNavBar$.next(true)
    this.utilsService.showFooter$.next(true)

  }
}
