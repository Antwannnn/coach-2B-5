import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-white text-xl font-bold">CoachApp</span>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <a
                routerLink="/"
                routerLinkActive="border-white"
                [routerLinkActiveOptions]="{ exact: true }"
                class="text-white hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent"
              >
                Accueil
              </a>
              <a
                routerLink="/coachs"
                routerLinkActive="border-white"
                class="text-white hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent"
              >
                Nos Coachs
              </a>
              <a
                routerLink="/seances"
                routerLinkActive="border-white"
                class="text-white hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent"
              >
                Séances
              </a>
              <a
                routerLink="/planning"
                routerLinkActive="border-white"
                class="text-white hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent"
              >
                Planning
              </a>
            </div>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <a
              routerLink="/login"
              class="text-white bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Connexion
            </a>
            <a
              routerLink="/register"
              class="text-indigo-700 bg-white hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
            >
              Inscription
            </a>
          </div>
          <div class="flex items-center md:hidden">
            <button
              (click)="toggleMobileMenu()"
              class="text-white p-2 rounded-md focus:outline-none"
            >
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  *ngIf="!isMobileMenuOpen()"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  *ngIf="isMobileMenuOpen()"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="isMobileMenuOpen()" class="md:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <a
            routerLink="/"
            routerLinkActive="bg-indigo-700"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Accueil
          </a>
          <a
            routerLink="/coachs"
            routerLinkActive="bg-indigo-700"
            class="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Nos Coachs
          </a>
          <a
            routerLink="/seances"
            routerLinkActive="bg-indigo-700"
            class="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Séances
          </a>
          <a
            routerLink="/planning"
            routerLinkActive="bg-indigo-700"
            class="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Planning
          </a>
        </div>
        <div class="pt-4 pb-3 border-t border-indigo-700">
          <div class="flex items-center px-5 space-x-3">
            <a
              routerLink="/login"
              class="text-white bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium w-full text-center"
            >
              Connexion
            </a>
          </div>
          <div class="mt-3 px-5">
            <a
              routerLink="/register"
              class="text-indigo-700 bg-white hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium block text-center"
            >
              Inscription
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  private mobileMenuOpen = signal(false);

  constructor() {}

  ngOnInit(): void {}

  isMobileMenuOpen() {
    return this.mobileMenuOpen();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((value) => !value);
  }
}
