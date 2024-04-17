import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { appConfig } from './app.config';
import { ReactiveFormsModule } from '@angular/forms';
import { OffersComponent } from './offers/offers.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    LoginComponent,
    OffersComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ...appConfig.providers,
  ],
  bootstrap: []
})
export class AppModule { }
