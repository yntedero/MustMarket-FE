import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OffersComponent } from './pages/offers/offers.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {CreateOffersComponent} from "./pages/offers/create-offers/create-offers.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {OfferDetailsComponent} from "./pages/offers/offer-details/offer-details.component";
import { AuthGuard} from "./services/auth/auth.guard";


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protected route
  {path: 'create-offer', component: CreateOffersComponent, canActivate: [AuthGuard] }, // Protected route
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }, // Protected route
  {path: 'offer-details/:id', component: OfferDetailsComponent},
];
