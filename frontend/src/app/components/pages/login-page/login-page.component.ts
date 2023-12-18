import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  // Constructor with dependency injection for UserService, ActivatedRoute, and Router
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  isSubmitted = false; //if the form has been submitted
  //returnUrl is a property used to store the URL the user tried to access before being redirected to the login page.
  //This typically happens when a user attempts to access a protected route without being logged in.
  //In the ngOnInit lifecycle hook, the component captures the returnUrl from the query parameters of the current route using activatedRoute.snapshot.queryParams.returnUrl.
  returnUrl = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // activatedRoute is a service that helps retrieve information about the current route, including query parameters. 
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    // alert(`email: ${this.loginForm.value.email} , password: ${this.loginForm.value.password}`);

    // Extract email and password values from the form
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    // Call the login method of the UserService, passing email and password
    this.userService
      .login({
        email: email,
        password: password,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl); // After successful login, navigate to the stored return URL
      });
  }
}
