import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(UserService);
  const toastrService = inject(ToastrService);

  if(userService.currentUser && userService.currentUser.isAdmin) {
    return true;
  }

  toastrService.error('Access Denied');
  router.navigate(['/dashboard']);

  return false;
};
