
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);
  
  const publicRoutes = ['/login', '/register'];

  if (publicRoutes.includes(state.url)) {
    return true;
  }

  let authenticated = auth.user() != null;
  
  if (!authenticated) {
    router.navigate(['/register']);
  }
  
  return authenticated;
};