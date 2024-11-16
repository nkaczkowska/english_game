
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { app } from '../../server';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private router: Router, private renderer: Renderer2) {}
  title = "englishGame";

  


  ngOnInnit(): void {
    let ws = document.getElementById("welcomeSign");
    if (ws != null){
      ws.remove();
    }

  }


  ngOnDestroy(): void {
  }

  clickButton1(){
    let button1 = document.getElementById('button1');
    let button2 = document.getElementById('button2');
    let ws = document.getElementById("welcomeSign");


    if(button1 != null && button2 != null && ws != null){
      button1.remove();
      button2.remove();
      ws.remove();
    }
    }



    clickButton2() {
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

