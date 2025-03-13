import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/questions`);
  }

  getQuestionsByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions?category_id=${categoryId}`);
  }
  
  addQuestions(question: { contents: string, category_id: number, question_type: number}): Observable<any> {
    console.log('Sending POST request:', question); // Log the request data
    return this.http.post(`${this.apiUrl}/questions`, question);
  }

  getCategoryIdByName(categoryName: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/categories/id?name=${categoryName}`);
  }
}

