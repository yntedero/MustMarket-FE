import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'

import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import { UserDTO } from '../../dtos/user.dto'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router)

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  login(email: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    })

    return this.http
      .post(
        'http://localhost:8080/api/authentication',
        { email, password },
        {
          headers,
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(
        tap((response: HttpResponse<any>) => {
          const authHeader = response.headers.get('Authorization')
          console.log('auth', response.headers.get('Authorization'))
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7)
            this.cookieService.set('token', token)
            console.log('Test Cookie:', this.cookieService.get('test')) // Log the test cookie
          }
        })
      )
  }

  register(user: any) {
    return this.http
      .post('http://localhost:8080/api/users', user, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const authHeader = response.headers.get('Authorization')
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7)
            this.cookieService.set('token', token)
            console.log('Test Cookie:', this.cookieService.get('test')) // Log the test cookie
          }
        })
      )
  }

  // getting token if it exists. If it doesn't, return an empty string
  getToken() {
    return this.cookieService.get('token') || ''
  }

  isAdmin(): Observable<boolean> {
    return this.getUserDetails().pipe(
      map((user: UserDTO) => {
        return user.role === 'ADMIN'
      })
    )
  }

  getUserDetails(): Observable<UserDTO> {
    const url = 'http://localhost:8080/api/users/user-details'
    return this.http.get<UserDTO>(url, { withCredentials: true }).pipe(
      map((response) => response as UserDTO) // Adjust if the response is wrapped in any object
    )
  }

  // auto adding token bearer to every request to the server
  addToken(request: HttpRequest<any>) {
    const token = this.getToken()
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
    return request
  }

  logout() {
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })

    return this.http
      .delete('http://localhost:8080/api/authentication', { headers })
      .pipe(
        tap(() => {
          this.cookieService.delete('token')
          this.router.navigate(['/login'])
        })
      )
  }

  isUserAuthorized() {
    const token = this.getToken()
    const isAuthorized = !!token
    console.log('User is authorized:', isAuthorized)
    if (isAuthorized) {
      console.log('Token:', token)
    }
    return isAuthorized
  }
}
