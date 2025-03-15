import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home.component';
import { CoachListComponent } from './pages/public/coach-list.component';
import { RegisterComponent } from './pages/public/register.component';
import { LoginComponent } from './pages/public/login.component';
import { CoachDashboardComponent } from './pages/coach/dashboard.component';
import { SportifDashboardComponent } from './pages/sportif/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard, adminGuard, userGuard } from './guards/role.guard';

export const routes: Routes = [
  // Public routes
  { path: '', component: HomeComponent },
  { path: 'coachs', component: CoachListComponent },
  { path: 'coachs/:id', loadComponent: () => import('./pages/public/coach-detail.component').then(m => m.CoachDetailComponent) },
  { 
    path: 'register', 
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
          import('./pages/sportif/profile.component').then(
            (m) => m.SportifProfileComponent
          ),
      },
      {
        path: 'seances',
        loadComponent: () =>
          import('./pages/sportif/seances.component').then(
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
          import('./pages/coach/profile.component').then(
            (m) => m.CoachProfileComponent
          ),
      },
      {
        path: 'seances',
        loadComponent: () =>
          import('./pages/coach/seances.component').then(
            (m) => m.CoachSeancesComponent
          ),
      },
      {
        path: 'sportifs',
        loadComponent: () =>
          import('./pages/coach/sportifs.component').then(
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
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/responsable/dashboard.component').then(
            (m) => m.ResponsableDashboardComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/responsable/profile.component').then(
            (m) => m.ResponsableProfileComponent
          ),
      },
      {
        path: 'coachs',
        loadComponent: () =>
          import('./pages/responsable/coachs.component').then(
            (m) => m.ResponsableCoachsComponent
          ),
      },
      {
        path: 'sportifs',
        loadComponent: () =>
          import('./pages/responsable/sportifs.component').then(
            (m) => m.ResponsableSportifsComponent
          ),
      },
      {
        path: 'fiches-de-paie',
        loadComponent: () =>
          import('./pages/responsable/fiches-de-paie.component').then(
            (m) => m.ResponsableFichesDePaieComponent
          ),
      },
      {
        path: 'statistiques',
        loadComponent: () =>
          import('./pages/responsable/statistiques.component').then(
            (m) => m.ResponsableStatistiquesComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Fallback route
  { path: '**', redirectTo: '' },
];
