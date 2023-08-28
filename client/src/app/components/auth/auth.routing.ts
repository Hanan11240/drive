import { Routes } from '@angular/router';


export const Auth_ROUTE: Routes = [

    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(app => app.LoginComponent)

    },

    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(app => app.RegisterComponent)

    }
];
