import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityDTO } from '../../dtos/city.dto';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cities: CityDTO[] = [];

  constructor(private http: HttpClient) {
    this.getAllCities();

  }

  createCity(city: CityDTO): Observable<CityDTO> {
    return this.http.post<CityDTO>('http://localhost:8080/api/cities', city);
  }

  getAllCities() {
    this.http.get<CityDTO[]>('http://localhost:8080/api/cities').subscribe((cities: CityDTO[]) => {
      this.cities = cities;
    });
    return this.cities;
  }
  getCityNameById(id: number): string {
    const city = this.cities.find(city => city.id === id);
    return city ? city.name : '';
  }
}
