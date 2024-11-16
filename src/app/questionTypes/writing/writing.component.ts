import { Component, OnInit } from '@angular/core';
import { SharingService } from '../sharing.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  constructor(private shared:SharingService, private router:Router ) {}

  ngOnInit(){
    this.q = this.shared.getMessage()
    this.numOfQ = this.shared.getNumQ()
  }

  logQuestion(event: any){
    /*add error message if no input is present*/

    console.log("Number of question: " + this.numOfQ)
    console.log("Type of question: writing")
    console.log("Content of question: " + this.q) 
    console.log("Answer#1:" + event.target.value);

    this.shared.incrementNumQ();

    this.navigateToAddOrFinish();
  }
  
  logQuestionB(){
    this.errorMessage = '';

    if(this.answer1){
    console.log("Number of question: " + this.numOfQ)
    console.log("Type of question: writing")
    console.log("Content of question: " + this.q) 
    console.log("Answer#1:" + this.answer1);

    this.shared.incrementNumQ();

    this.navigateToAddOrFinish();
    }
    else{

      this.errorMessage = "Please fill in the answer before submitting the question";
    }
  }

  navigateToAddOrFinish() {
    this.router.navigate(['/add-or-finish']);  //Navigate to add-or-finish 
  }

}

