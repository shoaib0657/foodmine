import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  // loginForm!: FormGroup;
  isSubmitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  submit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    
    alert(`email: ${this.loginForm.value.email} , password: ${this.loginForm.value.password}`);
  }

}
