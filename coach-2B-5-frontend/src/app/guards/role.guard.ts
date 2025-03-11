import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the required role from the route data
  const requiredRole = route.data['role'] as string;

  if (authService.hasRole(requiredRole)) {
    return true;
  }

  // If user doesn't have the required role, redirect to home
  router.navigate(['/']);
  return false;
};
