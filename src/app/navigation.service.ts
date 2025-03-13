import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PlayingService } from './play/playing.service';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  private isBackBlocked = false;
  constructor(private location: Location, private router: Router, private playing: PlayingService) {}



  listenForGoBack(): void {
    this.location.subscribe((event: any) => {

      if (this.router.url === '/game-over' && !this.isBackBlocked) {
        this.isBackBlocked = true; //prevents multiple alerts
        alert('Cannot go back after game over! You will repeat the question in which You have made an error, and than start recieving all the questions in the category from the beginning.');
        this.playing.setCurrentQIndex(-1);
        setTimeout(() => {
          this.isBackBlocked = false; //allow navigation events after the redirection is complete
        }, 100); // Small delay to ensure smooth redirection
      }
    });
  }


}
