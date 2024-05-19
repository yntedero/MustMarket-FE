import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth/auth.service'
import { CookieService } from 'ngx-cookie-service'
import { NgClass, NgForOf } from '@angular/common'
import { CreateOfferModel } from '../../../dtos/create-offer.dto'
import { CityDTO } from '../../../dtos/city.dto'
import { CategoryDTO } from '../../../dtos/category.dto'
import { OfferService } from '../../../services/offers/offer.service'
import { CityService } from '../../../services/cities/city.service'
import { CategoryService } from '../../../services/categories/category.service'
import { UserDTO } from '../../../dtos/user.dto'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { from, Observable, switchMap } from 'rxjs'
import { OfferDTO } from '../../../dtos/offer.dto'
@Component({
  selector: 'app-create-offers',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgForOf],
  templateUrl: './create-offers.component.html',
  styleUrl: './create-offers.component.scss',
})
export class CreateOffersComponent {
  // @Output() onCreateOffer = new EventEmitter<{ cityId: number, categoryId: number }>();
  createOfferObj: CreateOfferModel = new CreateOfferModel()
  cities: CityDTO[] = []
  categories: CategoryDTO[] = []
  fileToUpload: File | null = null

  // cityId: number = 0;
  // categoryId: number = 0;
  createOfferForm: FormGroup

  constructor(
    private router: Router,
    private offerService: OfferService,
    private cityService: CityService,
    private categoryService: CategoryService,
    private cookieService: CookieService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.createOfferForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      userId: new FormControl(null),
      cityId: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required)
    })
  }
  ngOnInit() {
    this.cityService.getAllCities().subscribe((cities) => {
      this.cities = cities
    })
    this.categoryService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories))
    this.authService.getUserDetails().subscribe((user: UserDTO) => {
      console.log(user)
      this.createOfferObj.userId = user.userId
    })
  }
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0)
    } else {
      this.fileToUpload = null
      console.error('No file selected')
    }
  }

  CreateOffer() {
    if(this.createOfferForm.valid){
      this.offerService
        .createOffer(this.createOfferForm.value, this.fileToUpload)
        .subscribe(
          (response) => {
            alert('Offer Created Successfully')
            this.router.navigate(['/offers'])
          },
          (error) => {
            console.error('Error creating offer', error)
          }
        )
    }
    }

}
