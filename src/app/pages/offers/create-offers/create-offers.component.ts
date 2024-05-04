import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {NgClass, NgForOf} from "@angular/common";
import {CreateOfferModel} from "../../../dtos/create-offer.dto";
import {CityDTO} from "../../../dtos/city.dto";
import {CategoryDTO} from "../../../dtos/category.dto";
import {OfferService} from "../../../services/offers/offer.service";
import {CityService} from "../../../services/cities/city.service";
import {CategoryService} from "../../../services/categories/category.service";
import {UserDTO} from "../../../dtos/user.dto";
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-offers',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './create-offers.component.html',
  styleUrl: './create-offers.component.scss'
})
export class CreateOffersComponent {
  // @Output() onCreateOffer = new EventEmitter<{ cityId: number, categoryId: number }>();
  createOfferObj: CreateOfferModel = new CreateOfferModel();
  cities: CityDTO[] = [];
  categories: CategoryDTO[] = [];
  // cityId: number = 0;
  // categoryId: number = 0;
  createOfferForm: FormGroup;
  constructor(private router: Router,
              private offerService: OfferService,
              private cityService: CityService,
              private categoryService: CategoryService,
              private cookieService: CookieService,
              private authService: AuthenticationService
  ) {
    this.createOfferForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'userId': new FormControl(null),
      'cityId': new FormControl(null),
      'categoryId': new FormControl(null)
    });
  }
  ngOnInit() {
    this.cityService.getAllCities().subscribe(cities => {
      this.cities = cities;
    });
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
    this.authService.getUserDetails().subscribe((user: UserDTO) => {
      console.log(user);
      this.createOfferObj.userId = user.userId;
    });
  }
  CreateOffer() {
    console.log(this.createOfferForm.value);
    this.offerService.createOffer(this.createOfferForm.value).subscribe(response => {
      alert('Offer Created Successfully');
      this.router.navigateByUrl('/offers');
    });
  }
}



