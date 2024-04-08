import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfferDTO } from '../dto/offer-dto';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent {
  offer: OfferDTO = {
    title: '',
    description: '',
    userId: 1, 
    cityId: 1, 
    categoryId: 1 
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) { }

  ngOnInit() {
    this.offer.userId = this.authService.getAuthenticatedUserId();
  }

  onSubmit() {
    this.http.post('/api/offers', this.offer).subscribe(
      (response: any) => {
        console.log('Offer created successfully:', response);
      },
      (error) => {
        console.error('Error creating offer:', error);
      }
    );
  }
}
