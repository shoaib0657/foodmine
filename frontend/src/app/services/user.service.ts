import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { GET_ALL_USERS, UPDATE_USER_URL, USER_BLOCK_URL, USER_BY_ID_URL, USER_CHANGE_PASSWORD_URL, USER_LOGIN_URL, USER_REGISTER_URL, USER_UPDATE_PROFILE_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { IUserUpdateProfile } from '../shared/interfaces/IUserUpdateProfile';

const USER_KEY = 'User'; //for local storage

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // BehaviorSubject for managing the user state
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    // Create an observable from the userSubject
    this.userObservable = this.userSubject.asObservable();
  }

  // Getter for the current user
  public get currentUser(): User {
    return this.userSubject.value;
  }

  // Method to handle user login
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          // Save the logged in user to local storage and trigger a notification about it
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          // Display error message if login fails
          this.toastrService.error(errorResponse.error, 'Login Failed')
        }
      })
    )

  }

  // Method to handle user registration
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          // Update user state and display success message
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          // Display error message if registration fails
          this.toastrService.error(errorResponse.error, 'Register Failed')
        }
      })
    )
  }

  // Method to handle user logout
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  //may require changes
  // Method to update user profile
  updateProfile(userUpdateProfile: IUserUpdateProfile): Observable<User> {
    return this.http.put<User>(USER_UPDATE_PROFILE_URL, userUpdateProfile).pipe(
      tap({
        next: (user) => {
          // Update the current user in memory and store it in local storage
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Profile Updated Successfully`,
            'Profile Updated'
          )
        },
        error: (errorResponse) => {
          // Display error message if update fails
          this.toastrService.error(errorResponse.error, 'Profile Update Failed')
        }
      })
    )
  }

  //may require changes
  // Method to change user password
  changePassword(currentPassword: string, newPassword: string) {

    // Construct the request body
    const requestBody = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    return this.http.put(USER_CHANGE_PASSWORD_URL, requestBody).pipe(
      tap({
        next: () => {
          // Display success message if password change is successful
          this.toastrService.success(
            `Password Changed Successfully`,
            'Password Changed'
          )
        },
        error: (errorResponse) => {
          // Display error message if password change fails
          this.toastrService.error(errorResponse.error, 'Password Change Failed')
        }
      })
    );
  }

  // Method to get all users
  getAll(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(GET_ALL_USERS + (searchTerm ?? ''));
  }

  // Method to toggle user block status
  toggleBlock(userId: string): Observable<boolean> {
    return this.http.put<boolean>(USER_BLOCK_URL + userId, {});
  }

  getById(userId: string): Observable<User> {
    return this.http.get<User>(USER_BY_ID_URL + userId);
  }

  updateUser(userid: string, userData: any) {
    return this.http.put(UPDATE_USER_URL + userid, userData);
  }

  // Method to set user data to local storage
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Method to get user data from local storage
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User();
  }

}
