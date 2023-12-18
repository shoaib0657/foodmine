import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  profileForm: FormGroup;
  isSubmitted: boolean = false;
  // returnUrl = ''; // I think its not needed here

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    let { name, address } = userService.currentUser;
    this.profileForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      address: new FormControl(address, [Validators.required])
    })
  }

  ngOnInit(): void {
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;  //why
  }

  updateProfile() {
    this.isSubmitted = true;
    if (this.profileForm.invalid) {
      // this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    const name = this.profileForm.value.name as string;
    const address = this.profileForm.value.address as string;

    this.userService.updateProfile({
      name,
      address
    }).subscribe((newUser) => {
      // console.log(newUser);
      // this.router.navigateByUrl(this.returnUrl);
    })
  }

}
