import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import { AuthenticationService } from '../../services/auth/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSignDivVisiable: boolean  = true;

  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService){}

  onRegister() {
    this.http.post<any>('http://localhost:8080/api/v1/auth/register', {
      username: this.signUpObj.username,
      password: this.signUpObj.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(
      (data: { token: string; username: string; }) => {
        console.log(data);
      },
      (error: any) => {
        console.error(error);
        alert('Invalid username or password');
      }
    );
  }

  onLogin() {
    this.http.post<any>('http://localhost:8080/api/v1/auth/login', {
      username: this.loginObj.username,
      password: this.loginObj.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(
      (data: { token: string; username: string; }) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        this.router.navigateByUrl("/offers")
      },
      (error: any) => {
        console.error(error);
        alert('Invalid username or password');
      }
    );
  }
}

export class SignUpModel  {
  name: string;
  username: string;
  phone: string;
  password: string;

  constructor() {
    this.username = "";
    this.name = "";
    this.phone = "";
    this.password= ""
  }
}

export class LoginModel  {
  username: string;
  password: string;

  constructor() {
    this.username = "";
    this.password= ""
  }
}
