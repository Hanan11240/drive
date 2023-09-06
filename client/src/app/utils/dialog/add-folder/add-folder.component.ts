import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-folder',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatDialogModule],
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent {

  constructor(private fb:NonNullableFormBuilder,private dialogRef:MatDialogRef<AddFolderComponent>){}
  folderForm  =  this.fb.group({
    folderName:['',Validators.required]
  })

  addFolder(){
    this.dialogRef.close({folderName:this.folderForm.get('folderName')?.value})
  }
}
