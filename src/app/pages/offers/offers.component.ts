import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {NgClass, NgFor} from "@angular/common";
import {OfferDTO} from "../../dtos/offer.dto";
import {OffersFilterComponent} from "./offers-filter/offers-filter.component";
import { OfferService } from '../../services/offers/offer.service';
import {HttpClient} from "@angular/common/http";
import { CityService } from '../../services/cities/city.service';
import { CategoryService } from '../../services/categories/category.service';
import {CityDTO} from "../../dtos/city.dto";
import {CategoryDTO} from "../../dtos/category.dto";
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
  cities: CityDTO[] = [];
  categories: CategoryDTO[] = [];
  offers: OfferDTO[] = [
    // new OfferDTO(1, 'Title 1', 'Description 1', 1, 1, 1),
    // new OfferDTO(2, 'Title 2', 'Description 2', 2, 2, 2),
    // new OfferDTO(3, 'Title 3', 'Description 3', 3, 3, 3)
  ];
  constructor(
    private router: Router,
    private offerService: OfferService,
    private cityService: CityService,
    private categoryService: CategoryService
  ) { }
  // constructor(private router: Router) { }

  ngOnInit() {
    this.getAllCities();
    this.getAllCategories();
    this.getOffers();
  }
  getOffers(cityId?: number, categoryId?: number) {
    if (cityId === 0) {
      cityId = undefined;
    }
    if (categoryId === 0) {
      categoryId = undefined;
    }
    this.offerService.getOffers(cityId, categoryId).subscribe((offers: OfferDTO[]) => {
      console.log("offers", offers);
      if (offers.length > 0) {
        this.offers = offers;
      }
    });
  }
  getAllCities() {
    this.cityService.getAllCities().subscribe((cities: CityDTO[]) => {
      this.cities = cities;
    });
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories: CategoryDTO[]) => {
      this.categories = categories;
    });
  }
  getCityNameById(id: number): string {
    const city = this.cities.find(city => city.id === id);
    return city ? city.name : '';
  }

  getCategoryNameById(id: number): string {
    const category = this.categories.find(category => category.id === id);
    return category ? category.name : '';
  }
}
