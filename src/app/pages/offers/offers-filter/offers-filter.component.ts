import {NgClass, NgFor, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CityService } from '../../../services/cities/city.service';
import { CategoryService } from '../../../services/categories/category.service';
import { CityDTO } from '../../../dtos/city.dto';
import { CategoryDTO } from '../../../dtos/category.dto';


@Component({
  selector: 'app-offers-filter',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './offers-filter.component.html',
  styleUrl: './offers-filter.component.scss'
})
export class OffersFilterComponent {
  @Output() filtersApplied = new EventEmitter<{ cityId: number, categoryId: number }>();
  cities: CityDTO[] = [];
  categories: CategoryDTO[] = [];
  cityId: number = 0;
  categoryId: number = 0;

  constructor(private cityService: CityService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.cities = this.cityService.getAllCities();
    this.categories = this.categoryService.getAllCategories();
  }

  applyFilters() {
    this.filtersApplied.emit({ cityId: this.cityId, categoryId: this.categoryId });
  }
}
