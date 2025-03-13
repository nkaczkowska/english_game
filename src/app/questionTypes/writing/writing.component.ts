import { Component, OnInit } from '@angular/core';
import { SharingService } from '../sharing.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionsService } from 'app/questions.service';
import { AnswersService } from 'app/answers.service';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [FormsModule, CommonModule, InfoButtonComponent],
  providers: [QuestionsService, AnswersService],
  templateUrl: './writing.component.html',
  styleUrl: './writing.component.css'
})

export class WritingComponent implements OnInit{
  q: string = "check"
  numOfQ: number = 0;
  typeOfQ: number = 0;
  answer1: string = '';

   //possible error message
  errorMessage: string = '';

  constructor(private shared:SharingService, private router:Router, private questionsService: QuestionsService, private answersService: AnswersService ) {}

  ngOnInit(){
    this.q = this.shared.getMessage()
    this.numOfQ = this.shared.getNumQ();
  } 


  logQuestion(){
    this.errorMessage = '';

    if(!this.q) {
      console.error('Question is empty');
      return;
    }

    //getting the currentCategoryID using the name from the sharingService and the function from the questionsService
    this.questionsService.getCategoryIdByName(this.shared.getCurrentCat()).subscribe({
      next: (categoryId) => {
        // Saving the category ID to the shared service
        this.shared.setCurrentCatID(categoryId);   

      const questionData = {
        contents: this.q,
        category_id: categoryId,
        question_type: this.typeOfQ
    };


    console.log('Payload sent to backend:', questionData);

    this.questionsService.addQuestions(questionData).subscribe({
      next: (response) => {
        console.log('Question added successfully:', response);

        this.shared.setCurrentQuestionID(response.questionId);

        if(this.answer1){
          console.log('Answer detected, proceeding to log it.');
          console.log("Number of question: " + this.numOfQ)
          console.log("Type of question: writing")
          console.log("Content of question: " + this.q) 
          console.log("Answer#1:" + this.answer1);  
          
          this.logAnswers(); 


        } else{
          this.errorMessage = "Please fill in the answer before submitting the question";
        }
        this.shared.incrementNumQ();
        this.navigateToAddOrFinish();
      },
      error: (error) => {
        console.error('Error adding question:', error);
        this.errorMessage = 'Error adding question. Please try again.';
      }
    });
    },
    error: (error) => {
      console.error('Error fetching category ID:', error);
      this.errorMessage = 'Error fetching category ID. Please try again.';
    }
  });
}

  

logAnswers() {
  const questionId = this.shared.getCurrentQuestionID(); // Making sure question_id exists before I proceed
  if (!questionId) {
      console.error('Cannot log answers: question_id is missing or invalid.');
      this.errorMessage = 'Error: question_id is not available. Cannot log answers.';
    return;
  }

  const answer = {
    question_id: this.shared.getCurrentQuestionID(),
    answer_text: this.answer1 //answer1 holds the answer to the question
  };

  console.log('Payload sent to backend for answers:', answer); // Log the payload

  this.answersService.addAnswer(answer).subscribe({
    next: (response) => {
      console.log('Answer logged successfully:', response);
    },
    error: (error) => {
      console.error('Error logging answer:', error);
    }
  });
}
 
  
  navigateToAddOrFinish() {
    this.router.navigate(['/add-or-finish']);  //Navigate to add-or-finish 
  }
}
