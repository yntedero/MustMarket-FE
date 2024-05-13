import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import { OfferDTO } from '../../dtos/offer.dto';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import {CreateOfferModel} from "../../dtos/create-offer.dto";
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
  getOfferById(id: number): Observable<OfferDTO> {
    return this.http.get<OfferDTO>(`http://localhost:8080/api/offers/${id}`);
  }
  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/offers/${id}`);
  }

  createOffer(offer: CreateOfferModel, file: File | null): Observable<OfferDTO> {
    return from(this.toBase64(file)).pipe(
      switchMap(base64File => {
        const offerData = {
          ...offer,
          file: base64File
        };
        const url = 'http://localhost:8080/api/offers';
        console.log(offerData);
        return this.http.post<OfferDTO>(url, offerData);
      })
    );
  }

  private toBase64(file: File | null): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      } else {
        resolve(null);
      }
    });
  }
}
