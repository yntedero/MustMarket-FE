import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // Create Basic Authentication header
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });

    return this.http.post('http://localhost:8080/api/authentication', { email, password }, { headers, observe: 'response' })
      .pipe(tap(response => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          localStorage.setItem('token', token);
        }
      }));
  }
  getOffers(): Observable<any> {
    return this.http.get('http://localhost:8080/api/offers');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
