import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FileModel } from './models/FileModel';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FileService } from './service/file.service';

@Component({
  selector: 'app-view-files',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatMenuModule,MatButtonModule],
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent {
@Input() file!:FileModel
@Output() fileDeleted= new EventEmitter<FileModel>()
userId!:string
constructor(private fileService:FileService){}

ngOnInit() {
  this.userId = localStorage.getItem('userId')  || ''
}

deleteFile(file:FileModel){
this.fileService.deleteFile(file,this.userId).subscribe({
  next:(response:any)=>{
      this.fileDeleted.emit(file)
  }
})
}
}
