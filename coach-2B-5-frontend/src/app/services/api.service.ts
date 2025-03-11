import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Effectue une requête GET
   * @param endpoint Point d'entrée de l'API
   * @param params Paramètres optionnels
   * @returns Observable avec la réponse
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    const options = { params: this.buildParams(params) };
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, options);
  }

  /**
   * Effectue une requête POST
   * @param endpoint Point d'entrée de l'API
   * @param data Données à envoyer
   * @returns Observable avec la réponse
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * Effectue une requête PUT
   * @param endpoint Point d'entrée de l'API
   * @param data Données à envoyer
   * @returns Observable avec la réponse
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * Effectue une requête PATCH
   * @param endpoint Point d'entrée de l'API
   * @param data Données à envoyer
   * @returns Observable avec la réponse
   */
  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * Effectue une requête DELETE
   * @param endpoint Point d'entrée de l'API
   * @returns Observable avec la réponse
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }

  /**
   * Construit les paramètres HTTP à partir d'un objet
   * @param params Objet de paramètres
   * @returns HttpParams
   */
  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }
} 