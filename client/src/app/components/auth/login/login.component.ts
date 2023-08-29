import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthModel } from '../model/user.model';
import { SuccessMessage } from 'src/app/utils/models/utilsModel';
import { UtilService } from 'src/app/utils/Services/utils.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ["", {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: NonNullableFormBuilder, private authService: AuthService, private utilsService: UtilService) { }

  ngOnInit(): void {
    this.utilsService.showNavBar$.next(false)
    this.utilsService.showFooter$.next(false)
  }

  onSubmit() {

    this.authService.login(this.loginForm.value as AuthModel).subscribe({
      next: (response: { _id: string }) => {
        console.log(response._id)
      },
      error: () => { }
    })
  }

  ngOnDestroy() {
    this.utilsService.showNavBar$.next(true)
    this.utilsService.showFooter$.next(true)

  }
}
