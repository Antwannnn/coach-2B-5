import { Coach } from './coach.model';
import { Sportif } from './sportif.model';
import { Exercice } from './exercice.model';

export type TypeSeance = 'solo' | 'duo' | 'trio';
export type ThemeSeance = 'fitness' | 'cardio' | 'muscu' | 'crossfit';
export type StatutSeance = 'prévue' | 'validée' | 'annulée';
export type NiveauSeance = 'débutant' | 'intermédiaire' | 'avancé';

export interface Seance {
  id: string;
  dateHeure: string; // ISO date string
  typeSeance: TypeSeance;
  themeSeance: ThemeSeance;
  coach: Coach;
  sportifs: Sportif[];
  exercices: Exercice[];
  statut: StatutSeance;
  niveauSeance: NiveauSeance;
}

export interface SeanceCreation
  extends Omit<Seance, 'id' | 'coach' | 'sportifs'> {
  coachId: string;
  sportifIds: string[];
}
