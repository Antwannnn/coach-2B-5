import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seance, SeanceCreation } from '../models/seance.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  constructor(private apiService: ApiService) {}

  /**
   * Récupère toutes les séances
   * @returns Observable avec la liste des séances
   */
  getAllSeances(): Observable<Seance[]> {
    return this.apiService.get<Seance[]>('seances');
  }

  /**
   * Récupère une séance par son ID
   * @param id ID de la séance
   * @returns Observable avec les données de la séance
   */
  getSeanceById(id: string): Observable<Seance> {
    return this.apiService.get<Seance>(`seances/${id}`);
  }

  /**
   * Crée une nouvelle séance
   * @param seanceData Données de la séance
   * @returns Observable avec les données de la séance créée
   */
  createSeance(seanceData: SeanceCreation): Observable<Seance> {
    return this.apiService.post<Seance>('seances', seanceData);
  }

  /**
   * Met à jour une séance
   * @param id ID de la séance
   * @param seanceData Données à mettre à jour
   * @returns Observable avec les données mises à jour
   */
  updateSeance(id: string, seanceData: Partial<Seance>): Observable<Seance> {
    return this.apiService.put<Seance>(`seances/${id}`, seanceData);
  }

  /**
   * Supprime une séance
   * @param id ID de la séance
   * @returns Observable avec la réponse
   */
  deleteSeance(id: string): Observable<any> {
    return this.apiService.delete<any>(`seances/${id}`);
  }

  /**
   * Récupère les séances d'un coach
   * @param coachId ID du coach
   * @returns Observable avec la liste des séances
   */
  getSeancesByCoach(coachId: string): Observable<Seance[]> {
    return this.apiService.get<Seance[]>(`coachs/${coachId}/seances`);
  }

  /**
   * Récupère les séances d'un sportif
   * @param sportifId ID du sportif
   * @returns Observable avec la liste des séances
   */
  getSeancesBySportif(sportifId: string): Observable<Seance[]> {
    return this.apiService.get<Seance[]>(`sportifs/${sportifId}/seances`);
  }

  /**
   * Valide une séance
   * @param id ID de la séance
   * @returns Observable avec les données mises à jour
   */
  validateSeance(id: string): Observable<Seance> {
    return this.apiService.patch<Seance>(`seances/${id}/validate`, {});
  }

  /**
   * Annule une séance
   * @param id ID de la séance
   * @returns Observable avec les données mises à jour
   */
  cancelSeance(id: string): Observable<Seance> {
    return this.apiService.patch<Seance>(`seances/${id}/cancel`, {});
  }
} 