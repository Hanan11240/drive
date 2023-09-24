import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserModel } from '../model/user.model';
import { SuccessMessage } from 'src/app/utils/models/utilsModel';
import { UtilService } from 'src/app/utils/Services/utils.service';
import { AddressFormGroup } from 'src/app/utils/components/address-from-group.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule,AddressFormGroup],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private formBuilder: NonNullableFormBuilder, private authService: AuthService, private utilsService: UtilService) {
  }
  ngOnInit(): void {
   
    this.utilsService.showNavBar$.next(false)
    this.utilsService.showFooter$.next(false)
 
  }
  registrationForm = this.formBuilder.group({
    email: ["", {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', [Validators.required, Validators.minLength(8)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    
  });

  onSubmit() {
    this.authService.register(this.registrationForm.value as UserModel).subscribe({
      next: (response: SuccessMessage) => {
      },
      error: () => { }
    })
  }
  ngOnDestroy() {
    this.utilsService.showNavBar$.next(true)
    this.utilsService.showFooter$.next(true)

  }
}
