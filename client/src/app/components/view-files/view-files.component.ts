import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FileModel } from './models/FileModel';

@Component({
  selector: 'app-view-files',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent {
@Input() file!:FileModel
}
