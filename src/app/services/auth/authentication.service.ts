import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      .pipe(tap(response => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          this.cookieService.set('token', token);
        }
      }));
  }

  getOffers(): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get('http://localhost:8080/api/offers', { headers });
  }

  getToken() {
    return this.cookieService.get('token') || '';
  }
}
