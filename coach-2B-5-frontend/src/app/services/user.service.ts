import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Sportif } from '../models/sportif.model';
import { Coach } from '../models/coach.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  /**
   * Récupère le profil de l'utilisateur courant
   * @returns Observable avec les données de l'utilisateur
   */
  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>('user/profile');
  }

  /**
   * Met à jour le profil de l'utilisateur
   * @param userData Données à mettre à jour
   * @returns Observable avec les données mises à jour
   */
  updateProfile(userData: Partial<User>): Observable<User> {
    return this.apiService.put<User>('user/profile', userData);
  }

  /**
   * Récupère le profil d'un sportif
   * @param id ID du sportif
   * @returns Observable avec les données du sportif
   */
  getSportifProfile(id: string): Observable<Sportif> {
    return this.apiService.get<Sportif>(`sportifs/${id}`);
  }

  /**
   * Met à jour le profil d'un sportif
   * @param id ID du sportif
   * @param sportifData Données à mettre à jour
   * @returns Observable avec les données mises à jour
   */
  updateSportifProfile(id: string, sportifData: Partial<Sportif>): Observable<Sportif> {
    return this.apiService.put<Sportif>(`sportifs/${id}`, sportifData);
  }

  /**
   * Récupère le profil d'un coach
   * @param id ID du coach
   * @returns Observable avec les données du coach
   */
  getCoachProfile(id: string | number): Observable<Coach> {
    return this.apiService.get<Coach>(`coachs/${id}`);
  }

  /**
   * Met à jour le profil d'un coach
   * @param id ID du coach
   * @param coachData Données à mettre à jour
   * @returns Observable avec les données mises à jour
   */
  updateCoachProfile(id: string | number, coachData: Partial<Coach>): Observable<Coach> {
    return this.apiService.put<Coach>(`coachs/${id}`, coachData);
  }

  /**
   * Récupère la liste des coachs
   * @returns Observable avec la liste des coachs
   */
  getAllCoachs(): Observable<Coach[]> {
    return this.apiService.get<Coach[]>('coachs');
  }

  /**
   * Récupère la liste des sportifs
   * @returns Observable avec la liste des sportifs
   */
  getAllSportifs(): Observable<Sportif[]> {
    return this.apiService.get<Sportif[]>('sportifs');
  }

  /**
   * Récupère la liste des sportifs d'un coach
   * @param coachId ID du coach
   * @returns Observable avec la liste des sportifs
   */
  getSportifsByCoach(coachId: string): Observable<Sportif[]> {
    return this.apiService.get<Sportif[]>(`coachs/${coachId}/sportifs`);
  }
} 