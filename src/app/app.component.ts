import { Component, Renderer2 } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CategoryService } from './category.service';
import { QuestionsService } from './questions.service';
import { CommonModule } from '@angular/common';
import { AnswersService } from './answers.service';
import { InfoButtonComponent } from './info-button/info-button.component';
import { NavigationService } from './navigation.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, InfoButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = "englishGame";
  categories: any[] = [];
  questions: any[] = [];
  answers: any[] =[];

  constructor(private router: Router, private renderer: Renderer2, private categoryService: CategoryService, private questionsService: QuestionsService, private answersService: AnswersService, private navigationService: NavigationService) {
    this.navigationService.listenForGoBack(); //for navigation purposes
  }


  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
      complete: () => {
        console.log('Category fetch of categories completed.');
      }
    });

    
    this.questionsService.getQuestions().subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
      },
      complete: () => {
        console.log('Category fetch of questions completed.');
      }
    });

    this.answersService.getAnswers().subscribe({
      next: (data) => {
        this.answers = data;
      },
      error: (error) => {
        console.error('Error fetching answers:', error);
      },
      complete: () => {
        console.log('Category fetch of answers completed.');
      }
    });




  };


  clickButton1(){
    console.log('clickButton1 called');
    let button1 = document.getElementById('button1');
    let button2 = document.getElementById('button2');
    let ws = document.getElementById("welcomeSign");


    if(button1 != null && button2 != null && ws != null){
      button1.remove();
      button2.remove();
      ws.remove();
    }
 
    document.body.style.backgroundColor = '#FC834A';

    }

    navigateToPickCat() {
      this.router.navigate(['/pick-category']); //Navigate to pickCat when button is clicked
    }



    clickButton2() {
      console.log('clickButton2 called');
      let button1 = document.getElementById('button1');
      let button2 = document.getElementById('button2');
      let ws = document.getElementById("welcomeSign");
  
      if(button1 != null && button2 != null && ws != null){
        button1.remove();
        button2.remove();
        ws.remove();
      }

      document.body.style.backgroundColor = '#156082';
      
      }

      navigateToPasswordInput() {
        this.router.navigate(['/password-input']);  //Navigate to passwordInput when button is clicked
      }


}

