import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../shared/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion à votre compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <a
            routerLink="/register"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            créer un nouveau compte
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  formControlName="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div
                *ngIf="
                  loginForm.get('email')?.invalid &&
                  loginForm.get('email')?.touched
                "
                class="text-red-500 text-sm mt-1"
              >
                Veuillez entrer une adresse email valide
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  formControlName="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div
                *ngIf="
                  loginForm.get('password')?.invalid &&
                  loginForm.get('password')?.touched
                "
                class="text-red-500 text-sm mt-1"
              >
                Le mot de passe est requis
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  Se souvenir de moi
                </label>
              </div>

              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                [disabled]="loginForm.invalid || isLoading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <span *ngIf="isLoading">Chargement...</span>
                <span *ngIf="!isLoading">Se connecter</span>
              </button>
            </div>

            <div *ngIf="errorMessage" class="text-red-500 text-center mt-2">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.isLoading = false;

        // Navigate to appropriate dashboard based on user role
        if (user.roles.includes('ROLE_COACH')) {
          this.router.navigate(['/coach/dashboard']);
        } else if (user.roles.includes('ROLE_SPORTIF')) {
          this.router.navigate(['/sportif/dashboard']);
        } else if (user.roles.includes('ROLE_RESPONSABLE')) {
          this.router.navigate(['/responsable/coachs']);
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        console.error('Login error', error);
      },
    });
  }
}
