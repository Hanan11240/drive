import { Component, Inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FolderModel } from 'src/app/components/Folder/models/folder';
import { FileModel } from 'src/app/components/view-files/models/FileModel';
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { SharedService } from '../../Services/share.service';
import {MatSelectModule} from '@angular/material/select';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-share-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
})
export class ShareDialogComponent {
  fileName!: string;
  folderName!: string;
  allUsers$!: Observable<{ email: string }[]> | undefined;
  sharedWith!: string[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FolderModel | FileModel,
    private dialog: MatDialog,
    private fb: NonNullableFormBuilder,
    private sharedService: SharedService,
    private dialogRef:MatDialogRef<any>
  ) {
    if ('fileName' in data) {
      this.fileName = data.fileName;
    } else {
      this.folderName = data.folderName;
    }
  }

  form = this.fb.group({
    shareWith: ['', [Validators.required]],
  });

  ngOnInit() {
    this.allUsers$ = this.sharedService.fetchUsers()
  }
  closeDialog() {
    
    this.dialogRef.close({data:null});
  }

  
  sharedEmails(){
    this.dialogRef.close({data:this.form.value})
  }

}
