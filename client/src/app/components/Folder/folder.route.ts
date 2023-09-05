import { Routes } from '@angular/router';


export const Folder_ROUTE: Routes = [
 
    {
        path: 'view-folder',
        loadComponent: () => import('../dashboard/dashboard.component').then(app=>app.DashboardComponent)
      },
  {
    path: '**',
    redirectTo: 'error/not-found'
  }
];