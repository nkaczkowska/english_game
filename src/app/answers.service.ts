import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //You can either fetch all answers, or just the answers with a specified question_id
  getAnswers(question_id?: number): Observable<any> {
    const url = question_id ? `${this.apiUrl}/answers?question_id=${question_id}` : `${this.apiUrl}/answers`;
    return this.http.get(url);
  }

  addAnswer( answer: { question_id: number, answer_text: string, is_correct?: boolean, pair_id?: number, order_position?: number}): Observable<any> {
    return this.http.post(`${this.apiUrl}/answers`, answer);
  }

}
