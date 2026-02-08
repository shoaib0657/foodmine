import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const user = this.userService.currentUser;
    if (user.token && this.userService.isTokenExpired(user.token)) {
      this.userService.clearUser();
      this.toastrService.warning('Your session has expired. Please log in again.', 'Session Expired');
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    }

    if(user.token && !this.userService.isTokenExpired(user.token)) {
      request = request.clone({
        setHeaders: {
          access_token: user.token
        }
      })
    }
    
    return next.handle(request);
  }
}
