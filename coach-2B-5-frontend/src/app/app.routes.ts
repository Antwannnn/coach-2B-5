import { Routes } from '@angular/router';
import { HomeComponent } from './components/public/home.component';
import { CoachListComponent } from './components/public/coach-list.component';
import { RegisterComponent } from './components/public/register.component';
import { LoginComponent } from './components/public/login.component';
import { CoachDashboardComponent } from './components/coach/dashboard.component';
import { SportifDashboardComponent } from './components/sportif/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Public routes
  { path: '', component: HomeComponent },
  { path: 'coachs', component: CoachListComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/public/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  // Protected routes - Sportif
  {
    path: 'sportif',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_SPORTIF' },
    children: [
      { path: 'dashboard', component: SportifDashboardComponent },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/sportif/profile.component').then(
            (m) => m.SportifProfileComponent
          ),
      },
      {
        path: 'seances',
        loadComponent: () =>
          import('./components/sportif/seances.component').then(
            (m) => m.SportifSeancesComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Protected routes - Coach
  {
    path: 'coach',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_COACH' },
    children: [
      { path: 'dashboard', component: CoachDashboardComponent },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/coach/profile.component').then(
            (m) => m.CoachProfileComponent
          ),
      },
      {
        path: 'seances',
        loadComponent: () =>
          import('./components/coach/seances.component').then(
            (m) => m.CoachSeancesComponent
          ),
      },
      {
        path: 'sportifs',
        loadComponent: () =>
          import('./components/coach/sportifs.component').then(
            (m) => m.CoachSportifsComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Protected routes - Responsable
  {
    path: 'responsable',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_RESPONSABLE' },
    children: [
      {
        path: 'coachs',
        loadComponent: () =>
          import('./components/responsable/coachs.component').then(
            (m) => m.ResponsableCoachsComponent
          ),
      },
      {
        path: 'fiches-de-paie',
        loadComponent: () =>
          import('./components/responsable/fiches-de-paie.component').then(
            (m) => m.ResponsableFichesDePaieComponent
          ),
      },
      { path: '', redirectTo: 'coachs', pathMatch: 'full' },
    ],
  },

  // Fallback route
  { path: '**', redirectTo: '' },
];
