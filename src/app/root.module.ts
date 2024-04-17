import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { appConfig } from './app.config';
import {LoginComponent} from "./login/login.component";

@NgModule({
  imports: [
    AppModule
  ],
  providers:[...appConfig.providers],
  bootstrap: [LoginComponent]
})
export class RootModule { }
