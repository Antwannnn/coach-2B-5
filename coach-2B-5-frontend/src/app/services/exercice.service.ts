import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercice, ExerciceCreation } from '../models/exercice.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  constructor(private apiService: ApiService) {}

  /**
   * Récupère tous les exercices
   * @returns Observable avec la liste des exercices
   */
  getAllExercices(): Observable<Exercice[]> {
    return this.apiService.get<Exercice[]>('exercices');
  }

  /**
   * Récupère un exercice par son ID
   * @param id ID de l'exercice
   * @returns Observable avec les données de l'exercice
   */
  getExerciceById(id: string): Observable<Exercice> {
    return this.apiService.get<Exercice>(`exercices/${id}`);
  }

  /**
   * Crée un nouvel exercice
   * @param exerciceData Données de l'exercice
   * @returns Observable avec les données de l'exercice créé
   */
  createExercice(exerciceData: ExerciceCreation): Observable<Exercice> {
    return this.apiService.post<Exercice>('exercices', exerciceData);
  }

  /**
   * Met à jour un exercice
   * @param id ID de l'exercice
   * @param exerciceData Données à mettre à jour
   * @returns Observable avec les données mises à jour
   */
  updateExercice(id: string, exerciceData: Partial<Exercice>): Observable<Exercice> {
    return this.apiService.put<Exercice>(`exercices/${id}`, exerciceData);
  }

  /**
   * Supprime un exercice
   * @param id ID de l'exercice
   * @returns Observable avec la réponse
   */
  deleteExercice(id: string): Observable<any> {
    return this.apiService.delete<any>(`exercices/${id}`);
  }

  /**
   * Récupère les exercices d'une séance
   * @param seanceId ID de la séance
   * @returns Observable avec la liste des exercices
   */
  getExercicesBySeance(seanceId: string): Observable<Exercice[]> {
    return this.apiService.get<Exercice[]>(`seances/${seanceId}/exercices`);
  }

  /**
   * Ajoute un exercice à une séance
   * @param seanceId ID de la séance
   * @param exerciceId ID de l'exercice
   * @returns Observable avec la réponse
   */
  addExerciceToSeance(seanceId: string, exerciceId: string): Observable<any> {
    return this.apiService.post<any>(`seances/${seanceId}/exercices`, { exerciceId });
  }

  /**
   * Retire un exercice d'une séance
   * @param seanceId ID de la séance
   * @param exerciceId ID de l'exercice
   * @returns Observable avec la réponse
   */
  removeExerciceFromSeance(seanceId: string, exerciceId: string): Observable<any> {
    return this.apiService.delete<any>(`seances/${seanceId}/exercices/${exerciceId}`);
  }
} 