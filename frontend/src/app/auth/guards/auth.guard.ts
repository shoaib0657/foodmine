import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(UserService);
  const toastrService = inject(ToastrService);

  const token = userService.currentUser.token;
  if(token && !userService.isTokenExpired(token)) {
    return true;
  }

  if (token) {
    userService.clearUser();
    toastrService.warning('Your session has expired. Please log in again.', 'Session Expired');
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url} });

  return false;
};
