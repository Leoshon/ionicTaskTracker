import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darckMode= new BehaviorSubject<boolean>(false);

  constructor() { }
  init(){
    const darkMode = JSON.parse(localStorage.getItem('darkMode') || '{}');
    this.setMode(darkMode);
  }
  setMode(darkMode: boolean){
    if(darkMode){
      document.body.setAttribute('color-theme', 'dark');
    }else{
      document.body.setAttribute('color-theme', 'light');
    }
    this.darckMode.next(darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }
}
