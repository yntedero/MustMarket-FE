import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser'
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { OfferDTO } from '../../dtos/offer.dto'
import { OffersFilterComponent } from './offers-filter/offers-filter.component'
import { OfferService } from '../../services/offers/offer.service'
import { HttpClient } from '@angular/common/http'
import { CityService } from '../../services/cities/city.service'
import { CategoryService } from '../../services/categories/category.service'
import { CityDTO } from '../../dtos/city.dto'
import { CategoryDTO } from '../../dtos/category.dto'
import { AuthService } from '../../services/auth/auth.service'
import routerLink from '@angular/router'
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgFor,
    OffersFilterComponent,
    NgIf,
    RouterModule,
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent implements OnInit {
  cities: CityDTO[] = []
  categories: CategoryDTO[] = []
  isAdmin: boolean = false
  offers: OfferDTO[] = [
    // new OfferDTO(1, 'Title 1', 'Description 1', 1, 1, 1),
    // new OfferDTO(2, 'Title 2', 'Description 2', 2, 2, 2),
    // new OfferDTO(3, 'Title 3', 'Description 3', 3, 3, 3)
  ]
  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private offerService: OfferService,
    private cityService: CityService,
    private categoryService: CategoryService,
    public authService: AuthService
  ) {}
  // constructor(private router: Router) { }

  ngOnInit() {
    this.getAllCities()
    this.getAllCategories()
    this.getOffers()
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin
    })
  }
  getPhotoUrl(photo: string | null): SafeResourceUrl | null {
    return photo
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/jpeg;base64,${photo}`
        )
      : null
  }
  getOffers(cityId?: number, categoryId?: number) {
    if (cityId === 0) {
      cityId = undefined
    }
    if (categoryId === 0) {
      categoryId = undefined
    }
    this.offerService
      .getOffers(cityId, categoryId)
      .subscribe((offers: OfferDTO[]) => {
        console.log('offers', offers)
        this.offers = offers
      })
  }
  getAllCities() {
    // this.cityService.getAllCities().subscribe((cities: CityDTO[]) => {
    //   this.cities = cities;
    // });
    this.cityService.getAllCities().subscribe((cities) => {
      this.cities = cities
    })
  }
  getAllCategories() {
    // this.categoryService.getAllCategories().subscribe((categories: CategoryDTO[]) => {
    //   this.categories = categories;
    // });
    this.categoryService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories))
  }
  getCityNameById(id: number): string {
    return this.cityService.getCityNameById(id)
  }
  // isAdmin(): boolean {
  //   return this.authService.isAdmin();
  // }
  getCategoryNameById(id: number): string {
    return this.categoryService.getCategoryNameById(id)
  }
  deleteOffer(id: number) {
    this.offerService.deleteOffer(id).subscribe(
      () => {
        this.getOffers()
      },
      (error) => {
        // Handle error
      }
    )
  }
}
