import { User } from './user.model';
import { Seance } from './seance.model';
import { FicheDePaie } from './fiche-de-paie.model';

export interface Coach extends User {
  specialites: string[];
  tarifHoraire: number;
  seances?: Seance[];
  fichesDePaie?: FicheDePaie[];
}

export interface CoachRegistration
  extends Omit<Coach, 'id' | 'seances' | 'fichesDePaie'> {
  password: string;
}
