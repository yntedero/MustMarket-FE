import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OffersComponent } from './offers/offers.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'offers', component: OffersComponent },
];
