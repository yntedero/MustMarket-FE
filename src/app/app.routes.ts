import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import {OffersComponent} from "./pages/offers/offers.component";
import {CreateOffersComponent} from "./pages/offers/create-offers/create-offers.component";

export const routes: Routes = [
  {path: 'login', redirectTo: 'LoginComponent', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'offers', component: OffersComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'create-offer', component: CreateOffersComponent},
];
