export type DifficulteExercice = 'facile' | 'moyen' | 'difficile';

export interface Exercice {
  id: string;
  nom: string;
  description: string;
  dureeEstimee: number; // en minutes
  difficulte: DifficulteExercice;
}

export interface ExerciceCreation extends Omit<Exercice, 'id'> {}
