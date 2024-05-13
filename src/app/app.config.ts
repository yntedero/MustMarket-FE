import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { authInterceptor } from './services/interceptors/token.interceptor'
import { AuthService } from './services/auth/auth.service'

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
}
