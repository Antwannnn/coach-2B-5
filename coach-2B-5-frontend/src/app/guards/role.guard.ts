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

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasRole('ROLE_ADMIN')) {
    return true;
  }

  // If user is not an admin, redirect to home
  router.navigate(['/']);
  return false;
};

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasRole('ROLE_USER') || authService.hasRole('ROLE_ADMIN')) {
    return true;
  }

  // If user is not a user or admin, redirect to login
  router.navigate(['/login']);
  return false;
};
