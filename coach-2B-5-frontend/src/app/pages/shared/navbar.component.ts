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
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
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
    if (this.authService.hasRole('ROLE_ADMIN')) {
      return 'Administrateur';
    } else if (this.authService.hasRole('ROLE_USER')) {
      return 'Utilisateur';
    } else if (this.authService.hasRole('ROLE_COACH')) {
      return 'Coach';
    } else if (this.authService.hasRole('ROLE_SPORTIF')) {
      return 'Sportif';
    } else if (this.authService.hasRole('ROLE_RESPONSABLE')) {
      return 'Responsable';
    }
    return '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
