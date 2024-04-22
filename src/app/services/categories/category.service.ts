import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../../dtos/category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>('http://localhost:8080/api/categories', category);
  }

  getAllCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>('http://localhost:8080/api/categories');
  }
}
