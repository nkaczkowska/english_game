import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-create-cat',
  standalone: true,
  imports: [],
  templateUrl: './create-cat.component.html',
  styleUrl: './create-cat.component.css'
})
export class CreateCatComponent {


  constructor(private router: Router) {} 

  ngOnInit(): void {

    let sign = document.getElementById("IP");
    if(sign != null){
      sign.innerHTML = '<h1 style = "font-size: 60px; color: white; text-align: center; vertical-align: bottom;"> Category name: </h1>';
      }

  }

  addCat(catName: string): void {
    //this should check if the cat name already exists in the database
    console.log(catName)
    this.navigateToAddQuestions();
    
  }


 navigateToAddQuestions() {
    this.router.navigate(['/add-questions']);  //Navigate to add-questions when button is clicked
  }

}
