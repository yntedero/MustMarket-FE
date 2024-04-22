import {inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Intercepting Requests");

    if (!request.url.includes('/api/authentication')) {
      const cookieService = inject(CookieService);
      const token = cookieService.get('token');
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const newRequest = new HttpRequest(request.method, request.url, request.body, { headers });
        return next.handle(newRequest);
      }
    }

    return next.handle(request);
  }
}
