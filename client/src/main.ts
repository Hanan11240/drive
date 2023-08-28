import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from './app/app-routing';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// if (environment.production) {
//   enableProdMode();
// }
bootstrapApplication(AppComponent,{
  providers:[
    provideRouter(APP_ROUTE),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule)
],
}).catch((err)=> console.error(err))