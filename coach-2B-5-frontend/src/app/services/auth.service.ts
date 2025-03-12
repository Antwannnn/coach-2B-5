import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, of, map } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { AuthUser } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  private apiUrlLogin = `${environment.apiUrl}/login`;
  private apiUrlUserInfo = `${environment.apiUrl}/user/me`;

  private currentUser = signal<User | null>(null);
  private isLoggedIn = signal<boolean>(false);
  
  private currentAuthUserSubject = signal<AuthUser>(new AuthUser());
  public get currentAuthUserValue(): AuthUser { return this.currentAuthUserSubject(); }

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
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

    if (token) {
      try {
        if (userData) {
          const user = JSON.parse(userData) as User;
          this.currentUser.set(user);
          this.isLoggedIn.set(true);
        }
        
        // Récupérer les informations de l'utilisateur depuis l'API
        this.fetchUserInfo(token);
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
        this.logout();
      }
    }
  }

  /**
   * Récupère les informations de l'utilisateur depuis l'API
   * @param token Le token JWT
   */
  private fetchUserInfo(token: string): void {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get<any>(this.apiUrlUserInfo, { headers }).subscribe({
      next: (data) => {
        if (data && data.email) {
          this.currentAuthUserSubject.set(new AuthUser(data.email, data.roles));
          this.isLoggedIn.set(true);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  /**
   * Connecte un utilisateur
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns Observable avec les données de l'utilisateur
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          
          // Si l'API renvoie également les données utilisateur
          if (response.user) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
            this.currentUser.set(response.user);
          }
          
          this.fetchUserInfo(response.token);
          this.isLoggedIn.set(true);
        }
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return throwError(() => new Error(error.error?.message || 'Identifiants invalides. Veuillez réessayer.'));
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
    this.currentAuthUserSubject.set(new AuthUser());
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
    const authUser = this.currentAuthUserValue;
    return authUser.roles.includes(role);
  }

  /**
   * Récupère le token d'authentification
   * @returns Le token ou null
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Met à jour les données de l'utilisateur dans le stockage local
   * @param user Les nouvelles données de l'utilisateur
   */
  updateUserInStorage(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
}
