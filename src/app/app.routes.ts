import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component' // Make sure you have imported HomeComponent
import { LoginComponent } from './pages/login/login.component'
import { OffersComponent } from './pages/offers/offers.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { CreateOffersComponent } from './pages/offers/create-offers/create-offers.component'
import { MessagesComponent } from './pages/messages/messages.component'
import { OfferDetailsComponent } from './pages/offers/offer-details/offer-details.component'
import { AuthGuard } from './services/auth/auth.guard'

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Set HomeComponent as the default landing page
  { path: 'login', component: LoginComponent },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'create-offer',
    component: CreateOffersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'messages/:email', component: MessagesComponent, canActivate: [AuthGuard] },
  {
    path: 'offer-details/:id',
    component: OfferDetailsComponent,
    canActivate: [AuthGuard],
  },
]
