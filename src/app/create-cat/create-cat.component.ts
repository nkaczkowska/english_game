import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CategoryService } from '../category.service';
import { NgIf } from '@angular/common';
import { SharingService } from 'app/questionTypes/sharing.service';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-create-cat',
  standalone: true,
  imports: [NgIf, InfoButtonComponent],
  providers: [CategoryService],
  templateUrl: './create-cat.component.html',
  styleUrl: './create-cat.component.css'
})
export class CreateCatComponent {

errorMessage: string = '';

  constructor(private router: Router, private categoryService: CategoryService, private sharingService: SharingService) {} 



  addCat(catName: string): void {
    //checking if there is something in the text box
    if(!catName){
      this.errorMessage = 'Please input a name for the category';
      return;
    }

    //recording the input category name as the currentCat in the application
    this.sharingService.setCurrentCat(catName);

    //adding the category name to the database
    this.categoryService.addCategory(catName).subscribe({
      next: (response) => {
        console.log('Category added successfully:', response);
        this.navigateToAddQuestions();
      },
      error: (error) => {
        console.error('Error adding category:', error);
        this.errorMessage = 'The category name You are trying to use already exists. Please try using a different category name.';
      }
    });    
  }


 navigateToAddQuestions() {
    this.router.navigate(['/add-questions']);  //Navigate to add-questions when button is clicked
  }

}
