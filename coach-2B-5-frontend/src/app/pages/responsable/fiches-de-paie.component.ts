import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Coach } from '../../models/coach.model';
import { FicheDePaie } from '../../models/fiche-de-paie.model';
import { UserService } from '../../services/user.service';
import { FicheDePaieService } from '../../services/fiche-de-paie.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-responsable-fiches-de-paie',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './fiches-de-paie.component.html',
  styleUrls: ['./fiches-de-paie.component.css']
})
export class ResponsableFichesDePaieComponent implements OnInit {
  coaches: Coach[] = [];
  fichesDePaie: FicheDePaie[] = [];
  isLoading = true;
  
  // Filtres
  selectedMonth: string = (new Date().getMonth() + 1).toString(); // Mois courant
  selectedYear: string = new Date().getFullYear().toString(); // Année courante
  selectedCoachId: string = '';
  
  constructor(
    private userService: UserService,
    private ficheDePaieService: FicheDePaieService
  ) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.isLoading = true;
    
    forkJoin({
      coaches: this.userService.getAllCoachs(),
      fichesDePaie: this.ficheDePaieService.getAllFichesDePaie()
    })
    .pipe(finalize(() => {
      this.isLoading = false;
    }))
    .subscribe({
      next: (results) => {
        this.coaches = results.coaches;
        this.fichesDePaie = results.fichesDePaie;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données', error);
        // Fallback aux données mockées en cas d'erreur
        this.loadMockData();
      }
    });
  }
  
  applyFilters(): void {
    // Filtrer les fiches de paie selon les critères sélectionnés
    let filtered = [...this.fichesDePaie];
    
    if (this.selectedMonth) {
      filtered = filtered.filter(fiche => 
        (fiche.month && fiche.month.toString() === this.selectedMonth) || 
        (fiche.periode && fiche.periode.split('/')[0] === this.selectedMonth)
      );
    }
    
    if (this.selectedYear) {
      filtered = filtered.filter(fiche => 
        (fiche.year && fiche.year.toString() === this.selectedYear) || 
        (fiche.periode && fiche.periode.split('/')[1] === this.selectedYear)
      );
    }
    
    if (this.selectedCoachId) {
      filtered = filtered.filter(fiche => 
        (fiche.coachId && fiche.coachId.toString() === this.selectedCoachId) || 
        (fiche.coach && fiche.coach.id.toString() === this.selectedCoachId)
      );
    }
    
    this.fichesDePaie = filtered;
  }
  
  loadMockData(): void {
    // Garder les données mockées existantes
    this.coaches = [
      {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Musculation'],
        tarifHoraire: 45,
        description: 'Coach spécialisé en musculation et remise en forme',
        createdAt: '2023-01-15',
        sportifs: [],
        // Propriétés pour la compatibilité
        firstName: 'Jean',
        lastName: 'Dupont',
        speciality: 'Musculation',
      },
      {
        id: '2',
        nom: 'Laurent',
        prenom: 'Marie',
        email: 'marie.laurent@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Yoga'],
        tarifHoraire: 40,
        description: 'Coach de yoga et méditation',
        createdAt: '2023-02-20',
        sportifs: [],
        // Propriétés pour la compatibilité
        firstName: 'Marie',
        lastName: 'Laurent',
        speciality: 'Yoga',
      },
      {
        id: '3',
        nom: 'Martin',
        prenom: 'Thomas',
        email: 'thomas.martin@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Cardio'],
        tarifHoraire: 42,
        description: 'Spécialiste en entraînement cardio-vasculaire',
        createdAt: '2023-03-10',
        sportifs: [],
        // Propriétés pour la compatibilité
        firstName: 'Thomas',
        lastName: 'Martin',
        speciality: 'Cardio',
      },
    ];
    
    this.fichesDePaie = [
      {
        id: '1',
        coachId: '1',
        month: '3',
        year: '2023',
        amount: 1350,
        hoursWorked: 30,
        status: 'paid',
        createdAt: '2023-03-31',
        // Propriétés pour la compatibilité avec le nouveau modèle
        coach: this.coaches[0],
        periode: '03/2023',
        totalHeures: 30,
        montantTotal: 1350
      },
      {
        id: '2',
        coachId: '2',
        month: '3',
        year: '2023',
        amount: 1200,
        hoursWorked: 30,
        status: 'paid',
        createdAt: '2023-03-31',
        // Propriétés pour la compatibilité avec le nouveau modèle
        coach: this.coaches[1],
        periode: '03/2023',
        totalHeures: 30,
        montantTotal: 1200
      },
      {
        id: '3',
        coachId: '3',
        month: '3',
        year: '2023',
        amount: 1260,
        hoursWorked: 30,
        status: 'paid',
        createdAt: '2023-03-31',
        // Propriétés pour la compatibilité avec le nouveau modèle
        coach: this.coaches[2],
        periode: '03/2023',
        totalHeures: 30,
        montantTotal: 1260
      },
      {
        id: '4',
        coachId: '1',
        month: '4',
        year: '2023',
        amount: 1350,
        hoursWorked: 30,
        status: 'pending',
        createdAt: '2023-04-30',
        // Propriétés pour la compatibilité avec le nouveau modèle
        coach: this.coaches[0],
        periode: '04/2023',
        totalHeures: 30,
        montantTotal: 1350
      },
      {
        id: '5',
        coachId: '2',
        month: '4',
        year: '2023',
        amount: 1200,
        hoursWorked: 30,
        status: 'pending',
        createdAt: '2023-04-30',
        // Propriétés pour la compatibilité avec le nouveau modèle
        coach: this.coaches[1],
        periode: '04/2023',
        totalHeures: 30,
        montantTotal: 1200
      },
    ];
  }

  getCoachName(coachId: string | number | undefined): string {
    if (coachId === undefined) return 'Coach inconnu';
    const coach = this.coaches.find((c) => c.id == coachId);
    return coach ? `${coach.firstName || coach.prenom} ${coach.lastName || coach.nom}` : 'Coach inconnu';
  }

  getCoachEmail(coachId: string | number | undefined): string {
    if (coachId === undefined) return '';
    const coach = this.coaches.find((c) => c.id == coachId);
    return coach ? coach.email : '';
  }

  getCoachInitials(coachId: string | number | undefined): string {
    if (coachId === undefined) return '??';
    const coach = this.coaches.find((c) => c.id == coachId);
    if (!coach) return '??';
    
    const firstInitial = (coach.firstName || coach.prenom || '').charAt(0);
    const lastInitial = (coach.lastName || coach.nom || '').charAt(0);
    return `${firstInitial}${lastInitial}`;
  }

  formatPeriod(month: string | number | undefined, year: string | number | undefined): string {
    if (month === undefined || year === undefined) return 'Période inconnue';
    
    // Convertir en nombres si nécessaire
    const monthNum = typeof month === 'string' ? parseInt(month, 10) : month;
    const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;
    
    const date = new Date(yearNum, monthNum - 1);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  getStatusLabel(status: string | undefined): string {
    if (!status) return 'Statut inconnu';
    
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'rejected':
        return 'Rejetée';
      default:
        return status;
    }
  }

  validateFicheDePaie(fiche: FicheDePaie): void {
    this.ficheDePaieService.updateFicheDePaie(fiche.id.toString(), { status: 'paid' })
      .subscribe({
        next: (updatedFiche) => {
          // Mettre à jour la fiche localement
          const index = this.fichesDePaie.findIndex(f => f.id === fiche.id);
          if (index !== -1) {
            this.fichesDePaie[index] = { ...this.fichesDePaie[index], status: 'paid' };
          }
        },
        error: (error) => {
          console.error('Erreur lors de la validation de la fiche de paie', error);
        }
      });
  }
  
  rejectFicheDePaie(fiche: FicheDePaie): void {
    this.ficheDePaieService.updateFicheDePaie(fiche.id.toString(), { status: 'rejected' })
      .subscribe({
        next: (updatedFiche) => {
          // Mettre à jour la fiche localement
          const index = this.fichesDePaie.findIndex(f => f.id === fiche.id);
          if (index !== -1) {
            this.fichesDePaie[index] = { ...this.fichesDePaie[index], status: 'rejected' };
          }
        },
        error: (error) => {
          console.error('Erreur lors du rejet de la fiche de paie', error);
        }
      });
  }
  
  generateFichesDePaie(): void {
    // Utiliser directement les valeurs string
    const month = this.selectedMonth;
    const year = this.selectedYear;
    
    this.ficheDePaieService.generateFichesDePaie(month, year)
      .subscribe({
        next: (fichesDePaie: FicheDePaie[]) => {
          // Ajouter les nouvelles fiches à la liste
          this.fichesDePaie = [...this.fichesDePaie, ...fichesDePaie];
          this.applyFilters();
        },
        error: (error: any) => {
          console.error('Erreur lors de la génération des fiches de paie', error);
        }
      });
  }
}
