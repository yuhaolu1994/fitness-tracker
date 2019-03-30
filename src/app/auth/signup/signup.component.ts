import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    // limit age to 18 years old
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
