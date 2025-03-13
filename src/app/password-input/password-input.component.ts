import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InfoButtonComponent } from 'app/info-button/info-button.component';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [InfoButtonComponent],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.html'
})

export class PasswordInputComponent {

  constructor(private router: Router, private renderer: Renderer2) { } //this Renderer2 allows me to safely manipulate the DOM elements

  private password = "share";

  checkPassword(value: string){
    let sign = document.getElementById("IP");
    if(value == this.password){
      this.navigateToCreateCat();
    }
    else{
      if(sign != null){
        sign.innerHTML = '<h1 style ="font-size: clamp(2rem, 3vw + 2rem, 4rem); padding-top: clamp(2rem, 5vh + 2rem, 10rem)" >Incorrect password. Try again: </h1>';
      }
    } 
  }

  
  navigateToCreateCat() {
    this.router.navigate(['/create-category']);  //Navigate to Create-Cat when button is clicked
  }

}
