import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharingService } from '../questionTypes/sharing.service';

@Component({
  selector: 'app-add-questions',
  standalone: true,
  imports: [],
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.css'
})


export class AddQuestionsComponent {
  numQ: number; 

  constructor(private router: Router, private shared: SharingService) {
    this.numQ = this.shared.getNumQ();
  } 

  question = "check"
  
  genQ(type: number, question: string){
    this.question = question;
    this.shared.setMessage(this.question);           

    
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
