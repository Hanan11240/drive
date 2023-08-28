import { Routes } from '@angular/router';


export const APP_ROUTE: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
 {
  path:'home',
  loadComponent:()=> import('./components/home/home.component').then(app=> app.HomeComponent)
 
 }, 

 {
  path:'auth',
  loadChildren:()=> import('./components/auth/auth.routing').then(app=> app.Auth_ROUTE)
 
 }, 

  {
    path:'**',
    redirectTo:'error/not-found'
  }
];
