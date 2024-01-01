import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrl: './user-edit-page.component.css'
})
export class UserEditPageComponent {

  isEditMode!: boolean;
  userId!: string;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    isAdmin: new FormControl<boolean>(false)
  })

  isSubmitted: boolean = false;

  constructor(
    activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      this.userId = params.userId;
      this.isEditMode = !!this.userId;
      if (this.isEditMode) {
        this.userService.getById(this.userId).subscribe((user) => {
          this.userForm.patchValue(user);
        })
      }
    })
  }

  submit() {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
        this.toastrService.success('User updated successfully!');
        this.router.navigate(['/admin/users']);
      })
    }
    else {
      //
    }

  }
}

