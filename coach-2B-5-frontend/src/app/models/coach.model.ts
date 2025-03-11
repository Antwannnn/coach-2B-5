import { User } from './user.model';
import { Seance } from './seance.model';
import { FicheDePaie } from './fiche-de-paie.model';
import { Sportif } from './sportif.model';

export interface Coach extends User {
  specialites: string[];
  tarifHoraire: number;
  seances?: Seance[];
  fichesDePaie?: FicheDePaie[];
  imageUrl?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  speciality?: string;
  sportifs?: Sportif[];
  createdAt?: string;
}

export interface CoachRegistration
  extends Omit<Coach, 'id' | 'seances' | 'fichesDePaie' | 'sportifs'> {
  password: string;
}
