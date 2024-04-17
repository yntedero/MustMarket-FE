import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
          const token = authHeader.substring(7); // Remove 'Bearer ' from the start of the string
          localStorage.setItem('token', token);
        }
      }));
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
