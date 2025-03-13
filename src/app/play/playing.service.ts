import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PlayingService {
  private apiUrl = 'http://localhost:3000';


  private questions: any[] = []; //shuffled questions for the category
  private currentQIndex: number = -1; //index of the current question IN THE QUESTIONS ARRAY! (NOT the same as question.id)
  private maxQuestions: number = 10; // Maximum number of questions to ask

  private answers: any[] = []; //all answers to all questions in the category

  currentCatID: number | null = null; //making sure that innitialy it is null
  currentQuestion: any = null; //current question being asked


  constructor(private http: HttpClient) { }

  
  setCurrentCatID(id: number): void {
    this.currentCatID = id;
  }

  getCurrentCatID(){
    return this.currentCatID;
  }

  getQuestionsByCategory(categoryId: number): Observable<any[]> {
    console.log(`Fetching questions for category ID: ${categoryId}`); // Debug
    return this.http.get<any[]>(`${this.apiUrl}/questions?category_id=${categoryId}`);
  }

  setCurrentQuestion(q: any): void {
    this.currentQuestion = q;
  }
  getCurrentQuestion(): any {
    return this.currentQuestion;
  }
  
  setCurrentQIndex(num: number): void {
    this.currentQIndex = num;
  }
  getCurrentQIndex(): any {
    return this.currentQIndex;
  }

  initializeQuestions(questions: any[]): void {
    console.log('Questions before shuffle:', questions); // Debug
    this.questions = this.shuffleArray(questions).slice(0, this.maxQuestions);
    console.log('Questions after shuffle:', this.questions); // Debug
    this.currentQIndex = 0;
    this.currentQuestion = this.questions.length > 0 ? this.questions[this.currentQIndex] : null;
    console.log('Current question after initialization:', this.currentQuestion); // Debug
  }

  nextQuestion(): any | null {
    this.currentQIndex++; //iterrate the number of the question
    if (this.currentQIndex < this.questions.length) { //ask the next question from the array 
      this.currentQuestion = this.questions[this.currentQIndex];
      return this.currentQuestion;
    } else {
      this.currentQuestion = null; //return null if there are no more questions
      console.log('No more questions to ask.'); // Debug
      return null;
    }
  }

  hasMoreQuestions(): boolean {
    if (!this.questions || this.questions.length === 0){
      console.log('Questions array is empty');
      return false; 
    }
    return this.currentQIndex + 1 < this.questions.length; //checking if the category has more questions to ask
  }

 shuffleArray(array: any[]): any[] { //a shuffle of the questions array
    return array.sort(() => Math.random() - 0.5);
  }

  getCategoryNamebyId(categoryId: number): Observable<string> {
      return this.http.get<string>(`${this.apiUrl}/categories/name?id=${categoryId}`);
  }

  getQuestionTypeById(questionId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/questions/type?id=${questionId}`);
  }

  getAnswers(question_id?: number): Observable<any> {
    const url = question_id ? `${this.apiUrl}/answers?question_id=${question_id}` : `${this.apiUrl}/answers`;
    return this.http.get(url);
  }

  getCategoryTotalNumOfTries(): Observable<number> {

    if (this.currentCatID === null) {
      console.error('Current Category ID is null. Cannot fetch number of tries.');
      throw new Error('Category ID is null');
    }
    return this.http.get<number>(`${this.apiUrl}/categories/totalNumOfTries?id=${this.currentCatID}`);
}

  async fetchAllAnswers(): Promise<void> {
    console.log('Fetching answers for all questions...');
    const answerPromises = this.questions.map((q) =>
      firstValueFrom(this.getAnswers(q.id))
    );

    try {
      const results = await Promise.all(answerPromises);
      this.answers = results.flat(); // Flatten the nested arrays into one
    } catch (err) {
      console.error('Error fetching answers:', err);
      throw err;
    }
    
  }

  getAnswersForCurrentQuestion(): any[] {
    if (!this.currentQuestion) {
      console.error('No current question set.');
      return [];
    }

    const answers = this.answers.filter(
      (answer) => answer.question_id === this.currentQuestion.id);

      if(this.currentQuestion.question_type == 2){ //the answers for matching questions are shuffled in a particular way, so right now the method returns them in the initial order
        return answers; 
      }
      else{
        return this.shuffleArray(answers);
      }
      
  }


  async incrementCatTotalNumOfTries(catId: number | null){

    if (!catId) {
      console.error('Category ID is not defined.');
      return;
    }

  try {
      const response = await fetch('http://localhost:3000/categories/totalNumOfTries/increment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: catId }), //send the category ID in the request body
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to increment category totalNumOfTries:', errorData.error);
          return;
      }

      const data = await response.json();
  } catch (error) {
      console.error('Error while incrementing category totalnumOfTries:', error);
  }
  }



  async winCategory(){

    if (!this.currentCatID) {
      console.error('Category ID is not defined.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/categories/isWon/switch', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: this.currentCatID }), //send the category ID in the request body
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to update category isWon:', errorData.error);
          return;
      }

      const data = await response.json();
      console.log('Category isWon updated successfully:', data);
  } catch (error) {
      console.error('Error while updating category isWon:', error);
  }
  }

}
