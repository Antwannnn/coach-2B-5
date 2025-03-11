import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  private currentUser = signal<User | null>(null);
  private isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  /**
   * Load user data from local storage on service initialization
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
        console.error('Error parsing user data from storage', error);
        this.logout();
      }
    }
  }

  /**
   * Login user with credentials
   */
  login(email: string, password: string): Observable<User> {
    return this.http
      .post<{ token: string; user: User }>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          this.currentUser.set(response.user);
          this.isLoggedIn.set(true);
        }),
        map((response) => response.user),
        catchError((error) => {
          console.error('Login failed', error);
          return of(error);
        })
      );
  }

  /**
   * Register a new user
   */
  register(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/register`, userData);
  }

  /**
   * Logout the current user
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  /**
   * Get the current user
   */
  getUser(): User | null {
    return this.currentUser();
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return !!user && user.roles.includes(role);
  }

  /**
   * Get the authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
