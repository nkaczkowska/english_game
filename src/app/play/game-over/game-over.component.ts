import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [InfoButtonComponent],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent { 

  constructor(private router: Router){}


  clickYes(){
    this.navigateToPreGame();
  }

  clickNo(){
    this.navigateToMainPage();     
  }


  navigateToPreGame() {
    document.body.style.backgroundColor = '#FC834A';
    this.router.navigate(['/pre-game']); //Navigate to pre-game when button is clicked
  }


  navigateToMainPage() {
    document.body.style.backgroundColor = '#542966';
    this.router.navigate(['/main']);
  }


}
