import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {
  users!: User[]; // Declare a property to hold the list of users

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    // Subscribe to the activated route params to get the search term
    this.activatedRoute.params.subscribe((params) => {
      // Call the service to get the users based on the search term
      this.userService.getAll(params.searchTerm).subscribe((users) => {
        // Assign the fetched users to the component property
        this.users = users;
      });
    });
  }

  // Method to handle the block/unblock toggle for a user
  handleToggleBlock(userId: string) {
    // Call the UserService method to toggle block status for the specified user
    this.userService.toggleBlock(userId).subscribe({
      next: (isBlocked) => {
        // Find the user in the list of users and update the block status locally in the component
        const user = this.users.find((u) => u.id === userId)!;
        if (user) {
          user.isBlocked = isBlocked;
        }
      },
      error: (err) => {
        // Display an error message using ToastrService if there's an error
        this.toastrService.error(err.error);
        console.log(err.error);
      },
    });
  }
}
