import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm Password does not match'
};

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!: AbstractControl;

  @Input()
  showErrorsWhen: boolean = true;

  errorMessages: string[] = [];

  checkValidation(): void {
    const errors = this.control.errors;
    if(!errors)
    {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    //['required', 'email']

    this.errorMessages = errorKeys.map(
      (key: string) => VALIDATORS_MESSAGES[key]
    );
  }

  constructor() { }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    })    

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

}
