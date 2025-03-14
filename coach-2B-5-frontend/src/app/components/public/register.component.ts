import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../shared/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créez votre compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <a
            routerLink="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            connectez-vous à votre compte existant
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            [formGroup]="registerForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <div>
              <label for="nom" class="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <div class="mt-1">
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  formControlName="nom"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div
                *ngIf="
                  registerForm.get('nom')?.invalid &&
                  registerForm.get('nom')?.touched
                "
                class="mt-1 text-sm text-red-600"
              >
                Le nom est requis
              </div>
            </div>

            <div>
              <label
                for="prenom"
                class="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <div class="mt-1">
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  formControlName="prenom"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div
                *ngIf="
                  registerForm.get('prenom')?.invalid &&
                  registerForm.get('prenom')?.touched
                "
                class="mt-1 text-sm text-red-600"
              >
                Le prénom est requis
              </div>
            </div>

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
                  formControlName="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div
                *ngIf="
                  registerForm.get('email')?.invalid &&
                  registerForm.get('email')?.touched
                "
                class="mt-1 text-sm text-red-600"
              >
                <span *ngIf="registerForm.get('email')?.errors?.['required']"
                  >L'email est requis</span
                >
                <span *ngIf="registerForm.get('email')?.errors?.['email']"
                  >L'email n'est pas valide</span
                >
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
                  formControlName="password"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div
                *ngIf="
                  registerForm.get('password')?.invalid &&
                  registerForm.get('password')?.touched
                "
                class="mt-1 text-sm text-red-600"
              >
                <span *ngIf="registerForm.get('password')?.errors?.['required']"
                  >Le mot de passe est requis</span
                >
                <span
                  *ngIf="registerForm.get('password')?.errors?.['minlength']"
                  >Le mot de passe doit contenir au moins 6 caractères</span
                >
              </div>
            </div>

            <div>
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  formControlName="confirmPassword"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div
                *ngIf="
                  registerForm.get('confirmPassword')?.invalid &&
                  registerForm.get('confirmPassword')?.touched
                "
                class="mt-1 text-sm text-red-600"
              >
                La confirmation du mot de passe est requise
              </div>
              <div
                *ngIf="registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched"
                class="mt-1 text-sm text-red-600"
              >
                Les mots de passe ne correspondent pas
              </div>
            </div>

            <div>
              <label
                for="niveauSportif"
                class="block text-sm font-medium text-gray-700"
              >
                Niveau sportif
              </label>
              <div class="mt-1">
                <select
                  id="niveauSportif"
                  name="niveauSportif"
                  formControlName="niveauSportif"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Sélectionnez votre niveau</option>
                  <option value="débutant">Débutant</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé</option>
                </select>
              </div>
              <div
                *ngIf="
                  registerForm.get('niveauSportif')?.invalid &&
                  registerForm.get('niveauSportif')?.touched
                "
                class="mt-1 text-sm text-red-600"
              >
                Le niveau sportif est requis
              </div>
            </div>

            <div class="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                formControlName="terms"
                required
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="terms" class="ml-2 block text-sm text-gray-900">
                J'accepte les
                <a href="#" class="text-indigo-600 hover:text-indigo-500"
                  >conditions d'utilisation</a
                >
                et la
                <a href="#" class="text-indigo-600 hover:text-indigo-500"
                  >politique de confidentialité</a
                >
              </label>
            </div>
            <div
              *ngIf="
                registerForm.get('terms')?.invalid &&
                registerForm.get('terms')?.touched
              "
              class="mt-1 text-sm text-red-600"
            >
              Vous devez accepter les conditions d'utilisation
            </div>

            <div>
              <button
                type="submit"
                [disabled]="registerForm.invalid"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                S'inscrire
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  Ou continuez avec
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Sign in with Google</span>
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Sign in with Facebook</span>
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        niveauSportif: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      // Here you would typically call a service to register the user
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
