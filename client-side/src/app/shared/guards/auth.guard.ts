import { CanActivateFn } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  // const router = inject(Router);
  // router.navigateByUrl('login');
  console.log("in gggg");
  
  return userService.token!='' ? true : false; 
};
