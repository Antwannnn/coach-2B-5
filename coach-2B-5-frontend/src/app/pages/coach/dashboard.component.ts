import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Coach } from '../../models/coach.model';
import { Seance } from '../../models/seance.model';
import { Sportif } from '../../models/sportif.model';
import { UserService } from '../../services/user.service';
import { SeanceService } from '../../services/seance.service';
import { AuthService } from '../../services/auth.service';
import { FicheDePaieService } from '../../services/fiche-de-paie.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-coach-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CoachDashboardComponent implements OnInit {
  coach: Coach = {
    id: '',
    nom: '',
    prenom: '',
    email: '',
    role: 'ROLE_COACH',
    specialites: [],
    tarifHoraire: 0
  };
  upcomingSeances: Seance[] = [];
  sportifs: Sportif[] = [];
  totalRevenue = 0;
  isLoading = true;
  
  constructor(
    private userService: UserService,
    private seanceService: SeanceService,
    private authService: AuthService,
    private ficheDePaieService: FicheDePaieService
  ) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.isLoading = true;
    
    const user = this.authService.getUser();
    if (!user) {
      this.isLoading = false;
      return;
    }
    
    // Charger les données du coach, ses séances et ses sportifs en parallèle
    forkJoin({
      coach: this.userService.getCoachProfile(user.id),
      seances: this.seanceService.getSeancesByCoach(String(user.id)),
      sportifs: this.userService.getSportifsByCoach(String(user.id)),
      fichesDePaie: this.ficheDePaieService.getFichesDePaieByCoach(String(user.id))
    })
    .pipe(finalize(() => {
      this.isLoading = false;
    }))
    .subscribe({
      next: (results) => {
        this.coach = results.coach;
        
        // Filtrer les séances à venir
        const now = new Date();
        this.upcomingSeances = results.seances
          .filter(seance => new Date(seance.dateHeure) > now)
          .sort((a, b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime())
          .slice(0, 5); // Prendre les 5 prochaines séances
        
        this.sportifs = results.sportifs;
        
        // Calculer le revenu total
        this.totalRevenue = results.fichesDePaie
          .filter(fiche => fiche.status === 'paid')
          .reduce((total, fiche) => total + (fiche.amount || 0), 0);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données', error);
        // Fallback aux données mockées en cas d'erreur
        this.loadMockData();
      }
    });
  }
  
  loadMockData(): void {
    // Garder la méthode existante comme fallback
    // ... existing code ...
  }
  
  formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  planifierSeance(sportif: Sportif): void {
    // In a real application, you would navigate to a form or open a modal
    console.log('Planifier une séance pour', sportif.prenom, sportif.nom);
  }
}
