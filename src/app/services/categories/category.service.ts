import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../../dtos/category.dto';
import {CityDTO} from "../../dtos/city.dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: CategoryDTO[] = [];

  constructor(private http: HttpClient) {
    this.getAllCategories().subscribe((categories: CategoryDTO[]) => {
      this.categories = categories;

    });
  }

  createCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>('http://localhost:8080/api/categories', category);
  }

  getAllCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>('http://localhost:8080/api/categories');
  }
  getCategoryNameById(id: number): string {
    const category = this.categories.find(category => category.id === id);
    return category ? category.name : '';
  }
}
