import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl("", [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {
    validators: [PasswordsMatchValidator('newPassword', 'confirmPassword')]
  })

  isSubmitted: boolean = false;
  // returnUrl = '';  // if needed in future

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  changePassword() {
    this.isSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    const currentPassword = this.changePasswordForm.value.currentPassword as string;
    const newPassword = this.changePasswordForm.value.newPassword as string;

    this.userService.changePassword(currentPassword, newPassword).subscribe(
      () => {
        this.changePasswordForm.reset();
        this.isSubmitted = false;
        // this.router.navigateByUrl(this.returnUrl);
      },
      (err) => {
        console.log(err);
      }

    );
  }
}
