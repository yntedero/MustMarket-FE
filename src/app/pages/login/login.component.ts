import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgClass } from '@angular/common'
import { AuthService } from '../../services/auth/auth.service'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, NgClass],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isSignDivVisiable: boolean = true

  signUpObj: SignUpModel = new SignUpModel()
  loginObj: LoginModel = new LoginModel()

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private cookieService: CookieService
  ) {}

  onRegister() {
    this.authenticationService.register(this.signUpObj).subscribe(
      (response) => {
        alert('Registration Success')
      },
      (error) => {
        alert('Registration Failed')
      }
    )
  }

  onLogin() {
    this.authenticationService
      .login(this.loginObj.email, this.loginObj.password)
      .subscribe(
        (response) => {
          console.log('token', this.authenticationService.getToken())
          this.cookieService.set('token', this.authenticationService.getToken())
          this.cookieService.set('user', this.loginObj.email)
          console.log(
            this.authenticationService.getToken() +
              ' ' +
              JSON.stringify(response.body)
          )
          this.router.navigateByUrl('/offers')
        },
        (error) => {
          alert('No User Found')
        }
      )
  }
}

export class SignUpModel {
  name: string
  email: string
  firstName: string
  lastName: string
  contact: string
  password: string

  constructor() {
    this.email = ''
    this.name = ''
    this.firstName = ''
    this.lastName = ''
    this.contact = ''
    this.password = ''
  }
}

export class LoginModel {
  email: string
  password: string

  constructor() {
    this.email = ''
    this.password = ''
  }
}
