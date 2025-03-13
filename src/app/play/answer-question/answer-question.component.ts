import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayingService } from '../playing.service';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule, InfoButtonComponent],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css'
})

export class AnswerQuestionComponent implements OnInit {

  constructor(private playing: PlayingService, private router: Router){}

  currentQuestion: any = null;
  errorMessage: string = '';
  typeOfCurrentQ: number = 4;
  //writing = 0, picking = 1, matching = 2, ordering = 3
  answersForCurrentQ: any[] = [];
  oddAnswersShuffled: any[] = [];
  selectedOptions: number[] = Array(6).fill(null); //stores the dropdown selections for each row of the matching question type


  currentAnswer1: string = '';
  currentAnswer2: string = '';   
  currentAnswer3: string = '';  
  currentAnswer4: string = '';
  currentAnswer5: string = '';
  currentAnswer6: string = '';
 
  ngOnInit(): void {

    const categoryId = this.playing.getCurrentCatID();

    //if questions are not initialized, this will fetch and initialize them
    if (!this.playing.getCurrentQuestion()) {

      if (!categoryId) { //this is necessary only because the app would not let me use categoryId if it was null
        console.error('Category ID is null, cannot fetch questions.');
        this.errorMessage = 'No category selected.';
        return; 
      }
       
      this.playing.getQuestionsByCategory(categoryId).subscribe({
        next: (questions) => {

          //initialize questions in the service
          this.playing.initializeQuestions(questions);
          console.log('Initialized questions:', this.playing.getCurrentQuestion()); // Debug
          this.currentQuestion = this.playing.getCurrentQuestion(); //retrieving the first item from the questions array
          this.typeOfCurrentQ = this.currentQuestion.question_type; //getting its question_type
        
          this.playing.fetchAllAnswers().then(() => { //fetching all the answers for the questions in the category
            this.answersForCurrentQ = this.playing.getAnswersForCurrentQuestion(); //getting all the answers for the current question
            console.log('Answers for current question:', this.playing.getAnswersForCurrentQuestion());

            if(this.typeOfCurrentQ == 2){ //if the question is of type matching, we need to shuffle only half of its answers
              this.shuffleOddAnswers();
            }
          });
        
        },
        error: (err) => {
          console.error('Error fetching questions:', err);
          this.errorMessage = 'Failed to fetch questions. Please try again.';
        },
      });

    } else {
      // Questions already initialized; get the current question
      console.log('Using already initialized question:', this.playing.getCurrentQuestion()); // Debug
      this.currentQuestion = this.playing.getCurrentQuestion(); //retrieving the first item from the questions array
      this.typeOfCurrentQ = this.currentQuestion.question_type; //getting its question_type
      this.answersForCurrentQ = this.playing.getAnswersForCurrentQuestion(); //getting all the answers for the current question
      
      if(this.typeOfCurrentQ == 2){ //if the question is of type matching, we need to shuffle only half of its answers
        this.shuffleOddAnswers();
      }
    }
  }
      


  isAnswerCorrectWriting(givenA: string): boolean{

      if(givenA == this.answersForCurrentQ[0].answer_text){
        //if the answer is correct
        if(this.playing.hasMoreQuestions()){ 
          //if there are more questions
          this.navigateToStorylineSlide();
        return true;
        }
        else{
          //if there are no more questions
          this.playing.winCategory();
          this.navigateToGameWon();
          return true;
        }
      }
      else{
        //if the answer is incorrect
        this.navigateToGameOver();
        return false;
      }  
}


isAnswerCorrectPicking(givenA: string): boolean{
  let correctAnswer: string = '';
  for (let i=0; i < 4; i++){ //finding the correct answer
    if(this.answersForCurrentQ[i].is_correct == 1){ 
      correctAnswer = this.answersForCurrentQ[i].answer_text;
    }
  }

  if(givenA == correctAnswer){
    //if the answer is correct
      if(this.playing.hasMoreQuestions()){ 
          //if there are more questions
          this.navigateToStorylineSlide();
      return true;
      }
      else{
          //if there are no more questions
          this.playing.winCategory();
          this.navigateToGameWon();
        return true;
      }
  }
  else{
    //if the answer is incorrect
    this.navigateToGameOver();
    return false;
  }  
}

isAnswerCorrectMatching(): boolean{
  let isCorrect: boolean = true;

  for (let i=0; i<3; i++){
    if (this.selectedOptions[i] == this.oddAnswersShuffled[i].pair_id){
      //than the answer is correct
    }
    else{
      isCorrect = false;
      this.navigateToGameOver();
      return isCorrect;
    }
  }
  

  //only happens if the answer is correct
  if(this.playing.hasMoreQuestions()){ 
    //if there are more questions
    this.navigateToStorylineSlide();
  return true;
  }
  else{
    //if there are no more questions
    this.playing.winCategory();
    this.navigateToGameWon();
    return true;
  }
}



shuffleOddAnswers() {
  //extracting odd-indexed answers
  const oddAnswers = this.answersForCurrentQ.filter((_, index) => index % 2 !== 0);

  this.oddAnswersShuffled = this.playing.shuffleArray(oddAnswers);
  console.log('Shuffled Odd Answers:', this.oddAnswersShuffled);

}



isAnswersCorrectOrdering(givenAnswers: string[]): boolean{
  let isCorrect: boolean = true;


  console.log('Given answers:', givenAnswers);
  console.log('Expected answers:', this.answersForCurrentQ);

  for (let i=0; i<3; i++){
    if(this.answersForCurrentQ[i].answer_text == givenAnswers[0]){
      if(this.answersForCurrentQ[i].order_position == 1){
        //than the answer is correct
      }
      else{
        isCorrect = false;
        this.navigateToGameOver();
        return isCorrect;
      }
    }
  }

  for (let i=0; i<3; i++){
    if(this.answersForCurrentQ[i].answer_text == givenAnswers[1]){
      if(this.answersForCurrentQ[i].order_position == 2){
        //than the answer is correct
      }
      else{
        isCorrect = false;
        this.navigateToGameOver();
        return isCorrect;
      }
    }
  }

  for (let i=0; i<3; i++){
    if(this.answersForCurrentQ[i].answer_text == givenAnswers[2]){
      if(this.answersForCurrentQ[i].order_position == 3){
        //than the answer is correct
      }
      else{
        isCorrect = false;
        this.navigateToGameOver();
        return isCorrect;
      }
    }
  }

    //only happens if the answers are correct
    if(this.playing.hasMoreQuestions()){ 
      //if there are more questions
      this.navigateToStorylineSlide();
    return true;
    }
    else{
      //if there are no more questions
      this.playing.winCategory();
      this.navigateToGameWon();
      return true;
    }
}

selectedOptions2: (number | null)[] = Array(3).fill(null); //stores dropdown selections

prepareAndCheckAnswersOrdering(): void {

  console.log(this.selectedOptions2);

  if (this.selectedOptions2.includes(null)) {
    alert('Please select a value for each dropdown.');
    return;
  }

  //check if the user has used 1, 2, 3 each exactly once
  const counts = { 1: 0, 2: 0, 3: 0 };
  this.selectedOptions2.forEach(value => {
    if (value !== null) counts[value as 1 | 2 | 3]++;
  });

  if (counts[1] !== 1 || counts[2] !== 1 || counts[3] !== 1) {
    alert('Please, chose each dropdown value exactly once.');
    return;
  }

  //create ordered array of answers based on dropdown selections
  const orderedAnswers = this.selectedOptions2
  .map((value, index) => value !== null ? { order: value, text: this.answersForCurrentQ[index].answer_text } : null)
  .filter((item): item is { order: number; text: string } => item !== null) // Type guard ensures only valid objects
  .sort((a, b) => a.order - b.order)
  .map(item => item.text); //pass only the text from the object

  this.isAnswersCorrectOrdering(orderedAnswers);
}



//for darkening only one button in the picking questions
selectedButton: number | null = null; // Index of the currently selected button
selectButton(index: number, selectedAnswer: string): void {
  this.selectedButton = index; // Set the clicked button index
  this.currentAnswer1 = selectedAnswer;
}


    navigateToStorylineSlide(){
      this.router.navigate(['/storyline-slide']);
    }
    

    navigateToGameOver(){
      this.router.navigate(['/game-over']);
    }

    navigateToGameWon(){
      this.router.navigate(['/game-won']);
    }


}
