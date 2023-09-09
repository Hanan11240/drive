import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from './app/app-routing';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

// if (environment.production) {
//   enableProdMode();
// }
bootstrapApplication(AppComponent,{
  providers:[
    provideRouter(APP_ROUTE),
    provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr(), 
    importProvidersFrom(BrowserAnimationsModule)
],
}).catch((err)=> console.error(err))