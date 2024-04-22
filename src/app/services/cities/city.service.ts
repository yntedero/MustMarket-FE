import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityDTO } from '../../dtos/city.dto';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  createCity(city: CityDTO): Observable<CityDTO> {
    return this.http.post<CityDTO>('http://localhost:8080/api/cities', city);
  }

  getAllCities(): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>('http://localhost:8080/api/cities');
  }
}
