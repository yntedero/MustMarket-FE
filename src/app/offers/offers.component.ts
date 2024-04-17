// src/app/offers/offers.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getOffers().subscribe(offers => {
      this.offers = offers;
    });
  }
}
