import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() autocomplete!: string;
  isPassword!: boolean;
  hidePassword: boolean = true;
  constructor() {}

  ngOnInit() {
    if (this.type === 'password') {
      this.isPassword = true;
    }
  }
  showHidePassword() {
    this.hidePassword = !this.hidePassword;
    if (this.hidePassword) {
      this.type = 'password';
    }else{
      this.type = 'text';
    }
  }
}
