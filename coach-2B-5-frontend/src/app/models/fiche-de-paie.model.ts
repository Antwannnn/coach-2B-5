import { Coach } from './coach.model';

export interface FicheDePaie {
  id: string;
  coach: Coach;
  periode: string; // Format: 'MM/YYYY' for month or 'WW/YYYY' for week
  totalHeures: number;
  montantTotal: number;
}

export interface FicheDePaieCreation extends Omit<FicheDePaie, 'id' | 'coach'> {
  coachId: string;
}
