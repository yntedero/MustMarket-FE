import { Component, OnInit } from '@angular/core'
import { OfferDTO } from '../../../dtos/offer.dto'
import { OfferService } from '../../../services/offers/offer.service'
import {ActivatedRoute, RouterLink} from '@angular/router'
import { CategoryService } from '../../../services/categories/category.service'
import { CityService } from '../../../services/cities/city.service'
import { Router } from '@angular/router';

import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-offer-details',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.scss',
})
export class OfferDetailsComponent implements OnInit {
  offer: OfferDTO

  constructor(
    private offerService: OfferService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private cityService: CityService,
    private categoryService: CategoryService
  ) {
    this.offer = new OfferDTO(1, 'Title', 'Description', 1, 'lol@gmail.com', 1, 1, '')
  }
  getPhotoUrl(file: string | null): SafeResourceUrl | null {
    return file ? this.sanitizer.bypassSecurityTrustResourceUrl(file) : null;
  }
  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.offerService.getOfferById(id).subscribe((offer: OfferDTO) => {
      this.offer = offer
    })
  }
  getCityNameById(id: number): string {
    return this.cityService.getCityNameById(id)
  }

  getCategoryNameById(id: number): string {
    return this.categoryService.getCategoryNameById(id)
  }
  redirectToChat(userEmail: string) {
    this.router.navigate(['/messages', userEmail]);
  }
}
