import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(AuthService);
  const router = inject(Router);
  if (userService.isLogged) {
    return true;
  }
  else{
    alert("Please Login First");
    router.navigate(['/login']);
    return false;
  }
};