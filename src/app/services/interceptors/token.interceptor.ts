import { inject } from '@angular/core'
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const token = inject(CookieService).get('token')
  if (req.url.includes('/api/authentication') || !token) {
    return next(req)
  }

  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })
  )
}
