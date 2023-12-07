import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  isSubmitted = false;
  returnUrl = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }


  submit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    // alert(`email: ${this.loginForm.value.email} , password: ${this.loginForm.value.password}`);

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.userService.login({
      email: email,
      password: password
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
