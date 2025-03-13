import { Component, OnInit } from '@angular/core';
import { SharingService } from '../questionTypes/sharing.service';
import { Router } from '@angular/router';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-add-or-finish',
  standalone: true,
  imports: [InfoButtonComponent],
  templateUrl: './add-or-finish.component.html',
  styleUrl: './add-or-finish.component.css'
})

export class AddOrFinishComponent implements OnInit {
  numOfQ: number = 0;


  constructor(private shared:SharingService, private router:Router){}

  ngOnInit() {
    this.numOfQ = this.shared.getNumQ()
  }

  clickYes(){
    this.navigateToAddQuestions();
  }

  clickNo(){
    document.body.style.backgroundColor = '#542966';
    this.shared.daefaultNumQ();
    this.navigateToMainPage();     
  }




 navigateToAddQuestions() {
    this.router.navigate(['/add-questions']);  //Navigate to add-questions when button is clicked
  }

  navigateToMainPage() {
    this.router.navigate(['/main']);
  }

}
