import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {NgClass} from "@angular/common";
import {CreateOfferModel} from "../../../dtos/create-offer.dto";
import {CityDTO} from "../../../dtos/city.dto";
import {CategoryDTO} from "../../../dtos/category.dto";
import {OfferService} from "../../../services/offers/offer.service";
import {CityService} from "../../../services/cities/city.service";
import {CategoryService} from "../../../services/categories/category.service";
@Component({
  selector: 'app-create-offers',
  standalone: true,
    imports: [
        FormsModule,
        NgClass
    ],
  templateUrl: './create-offers.component.html',
  styleUrl: './create-offers.component.scss'
})
export class CreateOffersComponent {


  createOfferObj: CreateOfferModel = new CreateOfferModel();
  cities: CityDTO[] = [];
  categories: CategoryDTO[] = [];

  constructor(private router: Router, private offerService: OfferService, private cityService: CityService, private categoryService: CategoryService, private cookieService: CookieService) { }

  ngOnInit() {
    this.cityService.getAllCities().subscribe(cities => this.cities = cities);
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onCreateOffer() {
    this.offerService.createOffer(this.createOfferObj).subscribe(response => {
      alert('Offer Created Successfully');
      this.router.navigateByUrl('/offers');
    });
  }
}



