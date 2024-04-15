import { Routes } from '@angular/router';
import { OffersComponent } from './offers/offers.component';
// import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';

export const routes: Routes = [
  { path: '', component: OffersComponent },
  { path: 'create-offer', component: CreateOfferComponent },
//   { path: 'offer-details/:id', component: OfferDetailsComponent }
];
