import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheDePaie, FicheDePaieCreation } from '../models/fiche-de-paie.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FicheDePaieService {
  constructor(private apiService: ApiService) {}

  /**
   * Récupère toutes les fiches de paie
   * @returns Observable avec la liste des fiches de paie
   */
  getAllFichesDePaie(): Observable<FicheDePaie[]> {
    return this.apiService.get<FicheDePaie[]>('fiches-de-paie');
  }

  /**
   * Récupère une fiche de paie par son ID
   * @param id ID de la fiche de paie
   * @returns Observable avec les données de la fiche de paie
   */
  getFicheDePaieById(id: string): Observable<FicheDePaie> {
    return this.apiService.get<FicheDePaie>(`fiches-de-paie/${id}`);
  }

  /**
   * Crée une nouvelle fiche de paie
   * @param ficheDePaieData Données de la fiche de paie
   * @returns Observable avec les données de la fiche de paie créée
   */
  createFicheDePaie(ficheDePaieData: FicheDePaieCreation): Observable<FicheDePaie> {
    return this.apiService.post<FicheDePaie>('fiches-de-paie', ficheDePaieData);
  }

  /**
   * Met à jour une fiche de paie
   * @param id ID de la fiche de paie
   * @param ficheDePaieData Données à mettre à jour
   * @returns Observable avec les données mises à jour
   */
  updateFicheDePaie(id: string, ficheDePaieData: Partial<FicheDePaie>): Observable<FicheDePaie> {
    return this.apiService.put<FicheDePaie>(`fiches-de-paie/${id}`, ficheDePaieData);
  }

  /**
   * Supprime une fiche de paie
   * @param id ID de la fiche de paie
   * @returns Observable avec la réponse
   */
  deleteFicheDePaie(id: string): Observable<any> {
    return this.apiService.delete<any>(`fiches-de-paie/${id}`);
  }

  /**
   * Récupère les fiches de paie d'un coach
   * @param coachId ID du coach
   * @returns Observable avec la liste des fiches de paie
   */
  getFichesDePaieByCoach(coachId: string): Observable<FicheDePaie[]> {
    return this.apiService.get<FicheDePaie[]>(`coachs/${coachId}/fiches-de-paie`);
  }

  /**
   * Récupère les fiches de paie par période
   * @param periode Période (format: 'MM/YYYY' ou 'WW/YYYY')
   * @returns Observable avec la liste des fiches de paie
   */
  getFichesDePaieByPeriode(periode: string): Observable<FicheDePaie[]> {
    return this.apiService.get<FicheDePaie[]>('fiches-de-paie', { periode });
  }

  /**
   * Génère les fiches de paie pour tous les coachs pour une période donnée
   * @param month Mois (format: 'MM')
   * @param year Année (format: 'YYYY')
   * @returns Observable avec la liste des fiches de paie générées
   */
  generateFichesDePaie(month: string, year: string): Observable<FicheDePaie[]> {
    return this.apiService.post<FicheDePaie[]>('fiches-de-paie/generate', { month, year });
  }
} 