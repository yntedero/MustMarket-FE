import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CityDTO } from '../../dtos/city.dto'

@Injectable({
  providedIn: 'root',
})
export class CityService {
  cities: CityDTO[] = []

  constructor(private http: HttpClient) {
    this.getAllCities().subscribe((cities: CityDTO[]) => {
      this.cities = cities
      console.log()
    })
  }

  createCity(city: CityDTO): Observable<CityDTO> {
    return this.http.post<CityDTO>('http://localhost:8080/api/cities', city)
  }
  getAllCities(): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>('http://localhost:8080/api/cities')
  }
  getCityNameById(id: number): string {
    const city = this.cities.find((city) => city.id === id)
    return city ? city.name : ''
  }
}
