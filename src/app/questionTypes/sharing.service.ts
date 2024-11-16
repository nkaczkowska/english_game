import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {


private message: string = "check";
private numQ: number = 1;
  constructor() { }

  setMessage(data: string){
    this.message = data

  }

  getMessage(){
    return this.message
  }

  setNumQ(data: number){
    this.numQ = data;

  }

  getNumQ(){
    return this.numQ;
  }

  incrementNumQ(){
    this.numQ++;
  }

  daefaultNumQ(){
    this.numQ = 1;
  }
}
