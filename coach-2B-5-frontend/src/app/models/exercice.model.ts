export type DifficulteExercice = 'facile' | 'moyen' | 'difficile';

export interface Exercice {
  id: string;
  nom: string;
  description: string;
  dureeEstimee: number; // in minutes
  difficulte: DifficulteExercice;
}
