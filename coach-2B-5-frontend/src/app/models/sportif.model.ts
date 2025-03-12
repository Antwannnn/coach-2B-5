import { User } from './user.model';
import { Seance } from './seance.model';

export type NiveauSportif = 'débutant' | 'intermédiaire' | 'avancé';

export interface Sportif extends User {
  dateInscription: string; // ISO date string
  niveauSportif: NiveauSportif;
  seances?: Seance[]; // Relation avec les séances
  telephone?: string; // Propriété optionnelle pour le téléphone
  objectifs?: string; // Propriété optionnelle pour les objectifs
  actif?: boolean; // Statut du sportif (actif ou inactif)
  nombreSeances?: number; // Nombre de séances suivies
  createdAt?: string; // Date de création du compte
}

export interface SportifRegistration extends Omit<Sportif, 'id' | 'seances'> {
  password: string;
}
