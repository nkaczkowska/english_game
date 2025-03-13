import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-button',
  standalone: true,
  imports: [],
  templateUrl: './info-button.component.html',
  styleUrl: './info-button.component.css'
})
export class InfoButtonComponent {

  @Input() message: string = ''; //a message can be passed in other components

  showPopup() {
    alert(this.message); 
  }
}
