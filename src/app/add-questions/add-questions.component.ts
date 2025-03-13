import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharingService } from '../questionTypes/sharing.service';
import { NgIf } from '@angular/common';
import { InfoButtonComponent } from 'app/info-button/info-button.component';


@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [NgIf, InfoButtonComponent],
  providers: [],
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.css'
})
 
 
export class AddQuestionsComponent {
  numQ: number;
  currentCat: string;
  errorMessage: string = '';

  constructor(private router: Router, private sharingService: SharingService) {
    this.numQ = this.sharingService.getNumQ();
    this.currentCat = this.sharingService.getCurrentCat();
  } 

  question: string = '';
  
  genQ(type: number, question: string){
    
    this.question = question; 
    this.sharingService.setMessage(this.question);  //I need this shating service, so that the question which was just input, will be dispalyed on the slide in which we input the answers

    if (this.question){
      if (type == 0){
        //writing
        this.navigateToWriting();
      }
      else if (type == 1){
        //picking
        this.navigateToPicking();
      }
      else if (type == 2){
        //matching
        this.navigateToMatching();
      }
      else if (type == 3){
        //ordering
        this.navigateToOrdering();
      }

    }
    else{
      this.errorMessage = "Please fill in the question";
    }
  }


  navigateToWriting() {
    this.router.navigate(['/add-writing-question']);  //Navigate to writnig when button is clicked

  }
  navigateToPicking() {
    this.router.navigate(['/add-picking-question']);  //Navigate to picking when button is clicked
  }
  navigateToMatching() {
    this.router.navigate(['/add-matching-question']);  //Navigate to matching when button is clicked
  }
  navigateToOrdering() {
    this.router.navigate(['/add-ordering-question']);  //Navigate to ordering when button is clicked
  }


}
