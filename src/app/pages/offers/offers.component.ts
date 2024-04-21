import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgClass, NgFor} from "@angular/common";
import {OfferDTO} from "../../dtos/offer.dto";
import {OffersFilterComponent} from "./offers-filter/offers-filter.component";
import { OfferService } from '../../services/offers/offer.service';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgFor,
    OffersFilterComponent
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent implements  OnInit{
  offers: OfferDTO[] = [
    new OfferDTO(1, 'Title 1', 'Description 1', 1, 1, 1),
    new OfferDTO(2, 'Title 2', 'Description 2', 2, 2, 2),
    new OfferDTO(3, 'Title 3', 'Description 3', 3, 3, 3)
  ];
  constructor(private router: Router, private offerService: OfferService) { }
  // constructor(private router: Router) { }

  ngOnInit() {
    this.getOffers();
  }
  getOffers(cityId?: number, categoryId?: number) {
    this.offerService.getOffers(cityId, categoryId).subscribe((offers: OfferDTO[]) => {
      if (offers.length > 0) {
        this.offers = offers;
      }
    });
  }
}
