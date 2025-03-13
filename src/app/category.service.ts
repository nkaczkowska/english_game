import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  addCategory(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, { name });
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/categories/${categoryId}`);
  }
  
  getTotalNumOfTriesForAll(): Observable<number> {
    return this.http
    .get<{ totalNumOfTriesForAll: number }>(`${this.apiUrl}/categories/totalNumOfTriesForAll`)
    .pipe(map(response => response.totalNumOfTriesForAll));
  }

}