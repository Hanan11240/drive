import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rename',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatDialogModule],
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.scss']
})
export class RenameComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data :any, private fb:NonNullableFormBuilder,private dialogRef:MatDialogRef<RenameComponent>){
    this.folderForm.patchValue({
      folderName:this.data
    })
  }
  folderForm  =  this.fb.group({
    folderName:['',Validators.required]
  })

  rename(){
    this.dialogRef.close({folderName:this.folderForm.get('folderName')?.value})
  }
}
