import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FolderModel } from 'src/app/components/Folder/models/folder';
import { FileModel } from 'src/app/components/view-files/models/FileModel';
import { MatIconModule } from '@angular/material/icon';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { SharedService } from '../../Services/share.service';
@Component({
  selector: 'app-share-dialog',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatIconModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent {
  fileName!: string;
  folderName!: string;
  allUsers$!:Observable<{email:string}[]> | undefined
  constructor(@Inject(MAT_DIALOG_DATA) public data:FolderModel | FileModel,private dialog:MatDialog,private fb:NonNullableFormBuilder,private sharedService:SharedService){
    if('fileName' in data){
      this.fileName = data.fileName
    }else{
      this.folderName = data.folderName
    }
  }

form = this.fb.group({
  shareWith: ['',[Validators.required]]
})

ngOnInit(){
  this.allUsers$ = this.form.get('shareWith')?.valueChanges.pipe(
      startWith(),
      debounceTime(300),
      switchMap((value:string)=> this.sharedService.fetchUsers(value))
  )
}
  closeDialog(){
    this.dialog.closeAll()
  }

  removeUsed(shared:{email:string}){
    // this.sharedpeople = this.sharedpeople.filter((people)=> people !== shared)
  }
}
