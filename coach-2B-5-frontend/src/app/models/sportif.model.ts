import { User } from './user.model';
import { Seance } from './seance.model';

export type NiveauSportif = 'débutant' | 'intermédiaire' | 'avancé';

export interface Sportif extends User {
  dateInscription: string; // ISO date string
  niveauSportif: NiveauSportif;
  seances?: Seance[];
}

export interface SportifRegistration extends Omit<Sportif, 'id' | 'seances'> {
  password: string;
}
