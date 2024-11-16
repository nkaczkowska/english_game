import { Component, OnInit } from '@angular/core';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ordering',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ordering.component.html',
  styleUrl: './ordering.component.css'
})

export class OrderingComponent {
  q: string = "check"
  numOfQ: number = 0;
  typeOfQ: number = 3;

    //variables which will hold the input values
    answer1: string = '';
    answer2: string = '';
    answer3: string = '';
  
  
   //possible error message
  errorMessage: string = '';

  constructor(private shared:SharingService, private router: Router) {}


  ngOnInit(){
    this.q = this.shared.getMessage();
    this.numOfQ = this.shared.getNumQ();
  }
  
    
    logQuestion(){
      this.errorMessage = '';
  
      if (this.answer1 && this.answer2 && this.answer3){ //checks if all the input fields have values in them
        console.log("Number of question: " + this.numOfQ)
        console.log("Type of question: picking")
        console.log("Content of question: " + this.q) 
        console.log("Answer#1: " + this.answer1);
        console.log("Answer#2: " + this.answer2)
        console.log("Answer#3: " + this.answer3)

        this.shared.incrementNumQ();
  
        this.navigateToAddOrFinish();
      }
      else{
        this.errorMessage = "Please fill in all the answers before submitting the question";
      }
      
    }
  
    navigateToAddOrFinish() {
      this.router.navigate(['/add-or-finish']);  //Navigate to add-or-finish 
    }
}
