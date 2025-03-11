import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, of, map } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  private currentUser = signal<User | null>(null);
  private isLoggedIn = signal<boolean>(false);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  /**
   * Charge l'utilisateur depuis le stockage local
   */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);

    if (token && userData) {
      try {
        const user = JSON.parse(userData) as User;
        this.currentUser.set(user);
        this.isLoggedIn.set(true);
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
        this.logout();
      }
    }
  }

  /**
   * Connecte un utilisateur
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns Observable avec les données de l'utilisateur
   */
  login(email: string, password: string): Observable<User> {
    return this.apiService.post<{ token: string, user: User }>('login', { email, password }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        this.currentUser.set(response.user);
        this.isLoggedIn.set(true);
      }),
      map(response => response.user),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return throwError(() => new Error('Identifiants invalides. Veuillez réessayer.'));
      })
    );
  }

  /**
   * Inscrit un nouvel utilisateur
   * @param userData Données de l'utilisateur
   * @returns Observable avec les données de l'utilisateur
   */
  register(userData: Partial<User> & { password: string }): Observable<User> {
    return this.apiService.post<{ token: string, user: User }>('register', userData).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        this.currentUser.set(response.user);
        this.isLoggedIn.set(true);
      }),
      map(response => response.user),
      catchError(error => {
        console.error('Erreur d\'inscription:', error);
        return throwError(() => new Error('Erreur lors de l\'inscription. Veuillez réessayer.'));
      })
    );
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   * @returns true si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  /**
   * Récupère l'utilisateur courant
   * @returns L'utilisateur courant ou null
   */
  getUser(): User | null {
    return this.currentUser();
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param role Le rôle à vérifier
   * @returns true si l'utilisateur a le rôle
   */
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return !!user && user.role === role;
  }

  /**
   * Récupère le token d'authentification
   * @returns Le token ou null
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
