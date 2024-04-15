import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface OfferDTO {
  title: string;
  description: string;
  userId: number;
  cityId: number;
  categoryId: number;
  category?: CategoryDTO; 
  city?: CityDTO; 
}

interface CategoryDTO {
  id: number;
  name: string;
}

interface CityDTO {
  id: number;
  name: string;
}

@Component({
  selector: 'offers-component',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: OfferDTO[] = [];
  categories: CategoryDTO[] = [];
  cities: CityDTO[] = [];
  selectedCityId: number | null = null;
  selectedCategoryId: number | null = null;

  constructor(private http: HttpClient, private router: Router) { }
  navigateToOfferDetails() {
    this.router.navigate(['/create-offer']);
  }
  ngOnInit() {
    this.getOffers();
    this.getCategories();
    this.getCities();
  }

  getOffers() {
    let params = new HttpParams();
    if (this.selectedCityId) {
      params = params.set('cityId', this.selectedCityId.toString());
    }
    if (this.selectedCategoryId) {
      params = params.set('categoryId', this.selectedCategoryId.toString());
    }

    this.http.get<OfferDTO[]>('/api/offers', { params }).subscribe(
      (response) => {
        this.offers = response;
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }

  getCategories() {
    this.http.get<CategoryDTO[]>('/api/categories').subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getCities() {
    this.http.get<CityDTO[]>('/api/cities').subscribe(
      (response) => {
        this.cities = response;
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }
  
  getCityName(cityId: number): string {
    const city = this.cities.find(ct => ct.id === cityId);
    return city ? city.name : 'Unknown';
  }
  onFilterChange() {
    this.getOffers();
  }
}
