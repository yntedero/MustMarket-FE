import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import { AuthenticationService } from '../../services/auth/authentication.service';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private router: Router, private authenticationService: AuthenticationService, private cookieService: CookieService){}

  onRegister() {
    this.authenticationService.register(this.signUpObj).subscribe(response => {
      alert('Registration Success');
    }, error => {
      alert('Registration Failed');
    });
  }

  onLogin() {
    this.authenticationService.login(this.loginObj.email, this.loginObj.password).subscribe(response => {
      alert("User Found...");
      this.cookieService.set('token', this.authenticationService.getToken());
      this.cookieService.set('user', JSON.stringify(response.body));
      this.router.navigateByUrl('/offers');
    }, error => {
      alert("No User Found");
    });
  }
}

export class SignUpModel  {
  name: string;
  email: string;
  phone: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.phone = "";
    this.password= ""
  }
}

export class LoginModel  {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password= ""
  }
}
