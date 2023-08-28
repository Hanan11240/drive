import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserModel } from '../model/user.model';
import { SuccessMessage } from 'src/app/utils/models/utilsModel';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private formBuilder: NonNullableFormBuilder,private authService:AuthService) { }
  registrationForm = this.formBuilder.group({
    email: ["", {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', [Validators.required, Validators.minLength(8)]],
    name: ['', [Validators.required, Validators.minLength(3)]]
  });
  onSubmit() {
    
        this.authService.register(this.registrationForm.value as UserModel).subscribe({
          next:(response:SuccessMessage)=>{
              console.log(response.message)
          },
          error:()=>{}
        })
  }
}
