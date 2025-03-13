import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {


private message: string = "check"; //contents of the current question
private numQ: number = 1; //the number of the question being added in this category
currentQuestionID: number = 0; //id of the particular question in the database
private currentCat: string = "check"; //the name of the current category
currentCatID: number | null = null; //making sure that innitialy it is null


  constructor() { }

  setMessage(data: string){
    this.message = data
  }

  getMessage(){
    return this.message
  }

  setCurrentQuestionID(data: number){
    this.currentQuestionID = data;
  }

  getCurrentQuestionID(){
    return this.currentQuestionID;
  }

  setCurrentCat(data: string){
    this.currentCat = data;
  }

  getCurrentCat(){
    return this.currentCat;
  }

  setCurrentCatID(id: number): void {
    this.currentCatID = id;
  }

  getCurrentCatID(){
    return this.currentCatID;
  }

  getNumQ(){
    return this.numQ;
  }

  incrementNumQ(){
    this.numQ++;
  }

  daefaultNumQ(){
    this.numQ = 1;
}
}
