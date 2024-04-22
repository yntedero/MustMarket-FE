import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import {CookieService} from "ngx-cookie-service";
export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
};
