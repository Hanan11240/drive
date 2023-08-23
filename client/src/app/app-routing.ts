import { Routes } from '@angular/router';


export const APP_ROUTE: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
 {
  path:'home',
  loadComponent:()=> import('./components/home/home.component').then(app=> app.HomeComponent)
 
 }, 

  {
    path:'**',
    redirectTo:'error/not-found'
  }
];
