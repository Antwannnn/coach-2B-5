import { Component, OnInit, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Logo et nom de l'application -->
        <a routerLink="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">C</span>
          </div>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CoachApp</span>
        </a>
        
        <!-- Bouton menu mobile -->
        <div class="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          <!-- Boutons pour utilisateurs non authentifiés -->
          <ng-container *ngIf="!isAuthenticated()">
            <a routerLink="/login" class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 ease-in-out">
              Connexion
            </a>
            <a routerLink="/register" class="text-indigo-700 bg-white border border-indigo-700 hover:bg-indigo-50 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 ease-in-out hidden sm:inline-block">
              Inscription
            </a>
          </ng-container>
          
          <!-- Menu utilisateur pour utilisateurs authentifiés -->
          <div *ngIf="isAuthenticated()" class="relative">
            <button 
              (click)="toggleUserMenu()" 
              type="button" 
              class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-indigo-300"
            >
              <span class="sr-only">Ouvrir le menu utilisateur</span>
              <div class="relative w-10 h-10 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <span class="font-medium text-white">{{ getUserInitials() }}</span>
              </div>
            </button>
            
            <!-- Dropdown menu -->
            <div 
              *ngIf="isUserMenuOpen()" 
              class="absolute right-0 mt-2 z-50 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 py-2"
            >
              <div class="px-4 py-3 text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                <div class="font-medium truncate">{{ getUserName() }}</div>
                <div class="truncate italic text-gray-500 dark:text-gray-400 text-xs">{{ getUserRole() }}</div>
              </div>
              <ul>
                <li>
                  <a 
                    *ngIf="hasRole('ROLE_COACH')" 
                    routerLink="/coach/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Mon profil
                  </a>
                  <a 
                    *ngIf="hasRole('ROLE_SPORTIF')" 
                    routerLink="/sportif/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Mon profil
                  </a>
                  <a 
                    *ngIf="hasRole('ROLE_RESPONSABLE')" 
                    routerLink="/responsable/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Mon profil
                  </a>
                </li>
                <li>
                  <a 
                    (click)="logout()" 
                    class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                  >
                    Déconnexion
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <button 
            (click)="toggleMobileMenu()" 
            type="button" 
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Ouvrir le menu principal</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        
        <!-- Menu principal -->
        <div 
          [ngClass]="{'hidden': !isMobileMenuOpen(), 'flex': isMobileMenuOpen()}" 
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <!-- Liens publics -->
            <ng-container *ngIf="!isAuthenticated()">
              <li>
                <a 
                  routerLink="/" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  [routerLinkActiveOptions]="{ exact: true }" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a 
                  routerLink="/coachs" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Nos Coachs
                </a>
              </li>
            </ng-container>
            
            <!-- Liens pour les coachs -->
            <ng-container *ngIf="isAuthenticated() && hasRole('ROLE_COACH')">
              <li>
                <a 
                  routerLink="/coach/dashboard" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Tableau de bord
                </a>
              </li>
              <li>
                <a 
                  routerLink="/coach/seances" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Séances
                </a>
              </li>
              <li>
                <a 
                  routerLink="/coach/sportifs" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Sportifs
                </a>
              </li>
            </ng-container>
            
            <!-- Liens pour les sportifs -->
            <ng-container *ngIf="isAuthenticated() && hasRole('ROLE_SPORTIF')">
              <li>
                <a 
                  routerLink="/sportif/dashboard" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Tableau de bord
                </a>
              </li>
              <li>
                <a 
                  routerLink="/sportif/seances" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Mes Séances
                </a>
              </li>
            </ng-container>
            
            <!-- Liens pour les responsables -->
            <ng-container *ngIf="isAuthenticated() && hasRole('ROLE_RESPONSABLE')">
              <li>
                <a 
                  routerLink="/responsable/dashboard" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Tableau de bord
                </a>
              </li>
              <li>
                <a 
                  routerLink="/responsable/coachs" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Gestion des Coachs
                </a>
              </li>
              <li>
                <a 
                  routerLink="/responsable/sportifs" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Gestion des Sportifs
                </a>
              </li>
              <li>
                <a 
                  routerLink="/responsable/fiches-de-paie" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Fiches de Paie
                </a>
              </li>
              <li>
                <a 
                  routerLink="/responsable/statistiques" 
                  routerLinkActive="text-indigo-700 dark:text-indigo-500 md:bg-transparent" 
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                >
                  Statistiques
                </a>
              </li>
            </ng-container>
            
            <!-- Lien d'inscription pour mobile -->
            <li *ngIf="!isAuthenticated()" class="md:hidden">
              <a 
                routerLink="/register" 
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0 md:dark:hover:text-indigo-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
              >
                Inscription
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <!-- Espace pour compenser la navbar fixe -->
    <div class="h-20"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    @media (max-width: 768px) {
      .items-center {
        max-height: calc(100vh - 4rem);
        overflow-y: auto;
      }
    }
  `],
})
export class NavbarComponent implements OnInit {
  private mobileMenuOpen = signal(false);
  private userMenuOpen = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // Ferme le menu utilisateur quand on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative') && this.isUserMenuOpen()) {
      this.userMenuOpen.set(false);
    }
  }

  isMobileMenuOpen() {
    return this.mobileMenuOpen();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(value => !value);
  }

  isUserMenuOpen() {
    return this.userMenuOpen();
  }

  toggleUserMenu() {
    this.userMenuOpen.update(value => !value);
    // Empêche la propagation pour éviter que le document:click ne ferme immédiatement le menu
    event?.stopPropagation();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  getUserName(): string {
    const user = this.authService.getUser();
    if (user) {
      return `${user.prenom} ${user.nom}`;
    }
    return '';
  }

  getUserInitials(): string {
    const user = this.authService.getUser();
    if (user) {
      return `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();
    }
    return '';
  }

  getUserRole(): string {
    const user = this.authService.getUser();
    if (user) {
      switch (user.role) {
        case 'ROLE_COACH':
          return 'Coach sportif';
        case 'ROLE_SPORTIF':
          return 'Sportif';
        case 'ROLE_RESPONSABLE':
          return 'Responsable';
        default:
          return user.role;
      }
    }
    return '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
