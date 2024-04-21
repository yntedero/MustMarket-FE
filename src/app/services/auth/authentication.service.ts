import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private cookieService: CookieService) {}

  login(email: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });

    return this.http.post('http://localhost:8080/api/authentication', { email, password }, { headers, observe: 'response' })
      .pipe(tap((response: HttpResponse<any>) => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          this.cookieService.set('token', token);
          console.log('Test Cookie:', this.cookieService.get('test')); // Log the test cookie
        }
      }));
  }

  register(user: any) {
    return this.http.post('http://localhost:8080/api/users', user, { observe: 'response' })
      .pipe(tap((response: HttpResponse<any>) => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          this.cookieService.set('token', token);
          console.log('Test Cookie:', this.cookieService.get('test')); // Log the test cookie
        }
      }));
  }

  // getting token if it exists. If it doesn't, return an empty string
  getToken() {
    return this.cookieService.get('token') || '';
  }

  // auto adding token bearer to every request to the server
  addToken(request: HttpRequest<any>) {
    const token = this.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }
}