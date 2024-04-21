import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import {OffersComponent} from "./pages/offers/offers.component";

export const routes: Routes = [
  {path: 'login', redirectTo: 'LoginComponent', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'offers', component: OffersComponent},
];
