import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoButtonComponent } from 'app/info-button/info-button.component';
import { PlayingService } from '../playing.service';
import { firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-game-won',
  standalone: true,
  imports: [InfoButtonComponent, NgIf],
  templateUrl: './game-won.component.html',
  styleUrl: './game-won.component.css' 
})
export class GameWonComponent {
 

numOfTries: number = -1;
imgSrc:string = 'assets/gameWonImage.webp'

  constructor(private router: Router, private playing: PlayingService){

    firstValueFrom(this.playing.getCategoryTotalNumOfTries()) //retrieving the current numOfTries for the particular category
    .then(result => {
      this.numOfTries = result;
      console.log('Number of tries:', this.numOfTries);
    })
    .catch(error => {
      console.error('Error fetching number of tries:', error);
    });
  }


  navigateToPickCat(){
    document.body.style.backgroundColor = '#FC834A';
    this.router.navigate(['/pick-category']); 
  }
}
