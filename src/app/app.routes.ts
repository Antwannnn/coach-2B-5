import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home.component';
import { CoachListComponent } from './pages/public/coach-list.component';
import { RegisterComponent } from './pages/public/register.component';
import { LoginComponent } from './pages/public/login.component';
import { CoachDashboardComponent } from './pages/coach/dashboard.component';
import { SportifDashboardComponent } from './pages/sportif/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard, adminGuard, userGuard } from './guards/role.guard';

// ... existing code ... 