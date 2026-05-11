import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly http = inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/categories`;

  constructor() {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  saveCategory(category: any): Observable<any> {
    return this.http.post<any>(this.API_URL, category);
  }

  deleteCategory(id:number): Observable<any>{
  return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  updateCategory(category:any, id:number): Observable<any>{
  return this.http.put<any>(`${this.API_URL}/${id}`, category);
}

}