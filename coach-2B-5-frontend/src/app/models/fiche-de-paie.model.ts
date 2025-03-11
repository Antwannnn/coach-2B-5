import { Coach } from './coach.model';

export interface FicheDePaie {
  id: string | number;
  coach: Coach;
  periode: string; // Format: 'MM/YYYY' pour mois ou 'WW/YYYY' pour semaine
  totalHeures: number;
  montantTotal: number;
  // Additional properties for backward compatibility
  coachId?: string | number;
  month?: string | number;
  year?: string | number;
  amount?: number;
  hoursWorked?: number;
  status?: 'paid' | 'pending' | 'rejected';
  createdAt?: string; // Date de création de la fiche de paie
}

export interface FicheDePaieCreation extends Omit<FicheDePaie, 'id' | 'coach'> {
  coachId: string | number;
}
