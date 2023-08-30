import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-view-folders',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './view-folders.component.html',
  styleUrls: ['./view-folders.component.scss']
})
export class ViewFoldersComponent {
@Input() folder:number =0
}
