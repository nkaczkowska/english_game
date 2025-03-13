import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayingService } from '../playing.service';
import { OnInit } from '@angular/core';
import { InfoButtonComponent } from 'app/info-button/info-button.component';


@Component({
  selector: 'app-storyline-slide',
  standalone: true,
  imports: [InfoButtonComponent],
  templateUrl: './storyline-slide.component.html',
  styleUrl: './storyline-slide.component.css'
})
export class StorylineSlideComponent implements OnInit{

  imgSrc: string = '';
  messageOfInstruction: string = '';

  constructor(private router: Router, private playing: PlayingService){}


  ngOnInit(): void {

      if (this.playing.getCurrentQIndex() == -1){
        this.imgSrc = 'assets/1storyline.png';
        this.messageOfInstruction='This is the beginning of the game. You will have to answer questions correctly, in order to help the Queen find her missing crown. Click "Next" to proceed.';
      }
      else if (this.playing.getCurrentQIndex() == 0){
        this.imgSrc = 'assets/2storyline.webp';
        this.messageOfInstruction='The Queen has to first cross the Tower Bridge in London. Perhaps the crown is at the other side of the River Thames? To help her cross, answer the question.';
      }
      else if (this.playing.getCurrentQIndex() == 1){
        this.imgSrc = 'assets/3storyline.webp';
        this.messageOfInstruction = 'Congratulations! the Queen has crossed the bridge. The next challenge is to survive the classic British rain.';

      }
      else if (this.playing.getCurrentQIndex() == 2){
        this.imgSrc = 'assets/4storyline.webp'
        this.messageOfInstruction = 'Good job! Now, the Queen has some doubts about the current suspiciously-looking Prime Minister. Maybe it was him who stole the Crown? Help her break into his flat, and check.';

      }
      else if (this.playing.getCurrentQIndex() == 3){
        this.imgSrc = 'assets/5storyline.webp'
        this.messageOfInstruction = 'Nicely done, but unfortunately it was not there. But it is time for a snack break. The Queen has to finish this plate full of British cuisine, and while she does, please answer the following question.';

      }
      else if (this.playing.getCurrentQIndex() == 4){
        this.imgSrc = 'assets/6storyline.webp'
        this.messageOfInstruction = 'Extra! Now, a new suspect has been identified. The Queen believes that maybe Paddington may have her prized posession. Help her find and interrogate the bear by answering a question.';

      }
      else if (this.playing.getCurrentQIndex() == 5){
        this.imgSrc = 'assets/7storyline.webp'
        this.messageOfInstruction = 'Perfect, but no luck. Maybe the Queen has left the Crown in one of the former Brithish colonies? Let"s check!';

      }
      else if (this.playing.getCurrentQIndex() == 6){
        this.imgSrc = 'assets/8storyline.webp'
        this.messageOfInstruction = 'Great, but we still don"t have the crown. Perhaps it is the time to reach out to the public and ask for help. Maybe someone saw it somewhere?';

      }
      else if (this.playing.getCurrentQIndex() == 7){
        this.imgSrc = 'assets/9storyline.webp'
        this.messageOfInstruction = 'Good answer! But no one has seen anything. The Queen now wants to check the top of the Big Ben tower';

      }
      else if (this.playing.getCurrentQIndex() == 8){
        this.imgSrc = 'assets/10storyline.webp'
        this.messageOfInstruction = 'OK, it was not there. But there was a message about where it is! Apparently, someone left it isnide the goal net at the London Stadium. By scoring a goal, the Queen will finally get to see her crown again!';

      }
  }

nextQuestion(){
  this.playing.nextQuestion();
  this.navigateToAnswerQuestion();
}

  navigateToAnswerQuestion(){
    this.router.navigate(['/answer-question']);
  }
  
}
