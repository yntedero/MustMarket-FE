import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferDTO } from '../../dtos/offer.dto';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class OfferService {

  constructor(private http: HttpClient) { }

  getOffers(cityId?: number, categoryId?: number): Observable<OfferDTO[]> {
    let url = 'http://localhost:8080/api/offers';
    if (cityId !== undefined || categoryId !== undefined) {
      url += '?';
      if (cityId !== undefined) {
        url += `cityId=${cityId}`;
      }
      if (categoryId !== undefined) {
        if (cityId !== undefined) {
          url += '&';
        }
        url += `categoryId=${categoryId}`;
      }
    }
    return this.http.get<OfferDTO[]>(url, { withCredentials: true });
  }
}
