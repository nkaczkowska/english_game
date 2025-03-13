import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayingService } from 'app/play/playing.service'; 
import { QuestionsService } from 'app/questions.service';
import { Router } from '@angular/router';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-pre-game',
  standalone: true,
  imports: [CommonModule, InfoButtonComponent],
  templateUrl: './pre-game.component.html',
  styleUrl: './pre-game.component.css'
})
export class PreGameComponent {

  questions: any[] = [];
  catId: number | null;
  catName: string = '';

  constructor (private playing: PlayingService, private questionsService: QuestionsService, private router: Router){
    this.catId = this.playing.getCurrentCatID();
    this.playing.setCurrentQIndex(-1);

  }

  

//make it so that it displays questions from that given category  
  ngOnInit(): void {
  
    if (this.catId === null) {
      console.error('Category ID is null. Cannot fetch questions.');
      return;
    }

     //fetching the category name
     this.playing.getCategoryNamebyId(this.catId).subscribe({
      next: (name: string) => {
        this.catName = name; //assign the category name
        console.log('Category name:', this.catName);
      },
      error: (err) => {
        console.error('Error fetching category name:', err);
      }
    });
 

    //fetching questions with the specific category ID
    this.questionsService.getQuestionsByCategoryId(this.catId).subscribe({
      next: (data) => {
        this.questions = data; //inputting the imported data into the questions[] array inside the component
        console.log('Fetched questions:', this.questions);
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      },
    });

  }


  beginPlaying(){

    this.playing.incrementCatTotalNumOfTries(this.catId); //show that the category has been clicked at least once
    this.navigateToStorylineSlide();
  }

  navigateToStorylineSlide(){
    document.body.style.backgroundColor = '#542966';
    this.router.navigate(['/storyline-slide']);

  }

}
