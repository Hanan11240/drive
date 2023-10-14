import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from './app/app-routing';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { Interceptor } from './app/utils/interceptor/http.interceptor';

// if (environment.production) {
//   enableProdMode();
// }
bootstrapApplication(AppComponent,{
  providers:[
    provideRouter(APP_ROUTE),
    provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr(), 
    importProvidersFrom(BrowserAnimationsModule),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:Interceptor,
      multi:true
    }
],
}).catch((err)=> console.error(err))