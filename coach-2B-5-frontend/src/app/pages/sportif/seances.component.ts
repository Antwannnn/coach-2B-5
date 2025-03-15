import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Seance } from '../../models/seance.model';
import { Coach } from '../../models/coach.model';
import { SeanceService } from '../../services/seance.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sportif-seances',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SportifSeancesComponent implements OnInit {
  seances: Seance[] = [];
  filteredSeances: Seance[] = [];
  isLoading = true;
  currentFilter = 'upcoming';
  
  constructor(
    private seanceService: SeanceService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadSeances();
  }
  
  loadSeances(): void {
    this.isLoading = true;
    
    // Récupérer l'ID du sportif connecté
    const userId = this.authService.getUser()?.id;
    
    if (userId) {
      this.seanceService.getSeancesBySportif(userId.toString())
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe({
          next: (seances) => {
            this.seances = seances;
            this.filterSeances(this.currentFilter);
          },
          error: (error) => {
            console.error('Erreur lors du chargement des séances', error);
            // Fallback aux données mockées en cas d'erreur
            this.loadMockSeances();
          }
        });
    } else {
      // Si l'utilisateur n'est pas connecté, charger des données mockées
      this.loadMockSeances();
      this.isLoading = false;
    }
  }
  
  loadMockSeances(): void {
    this.isLoading = true;
    
    // In a real application, you would fetch seances from a service
    // For now, we'll use mock data
    setTimeout(() => {
      const now = new Date();
      
      // Create some mock seances
      this.seances = [
        {
          id: '1',
          dateHeure: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
          typeSeance: 'solo',
          themeSeance: 'cardio',
          coach: {
            id: '1',
            nom: 'Martin',
            prenom: 'Sophie',
            email: 'sophie.martin@example.com',
            role: 'ROLE_COACH',
            specialites: ['cardio', 'fitness'],
            tarifHoraire: 50
          },
          sportifs: [],
          exercices: [],
          statut: 'prévue',
          niveauSeance: 'intermédiaire'
        },
        {
          id: '2',
          dateHeure: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          typeSeance: 'duo',
          themeSeance: 'fitness',
          coach: {
            id: '1',
            nom: 'Martin',
            prenom: 'Sophie',
            email: 'sophie.martin@example.com',
            role: 'ROLE_COACH',
            specialites: ['cardio', 'fitness'],
            tarifHoraire: 50
          },
          sportifs: [],
          exercices: [],
          statut: 'validée',
          niveauSeance: 'débutant'
        },
        {
          id: '3',
          dateHeure: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
          typeSeance: 'solo',
          themeSeance: 'muscu',
          coach: {
            id: '2',
            nom: 'Dubois',
            prenom: 'Thomas',
            email: 'thomas.dubois@example.com',
            role: 'ROLE_COACH',
            specialites: ['muscu', 'crossfit'],
            tarifHoraire: 55
          },
          sportifs: [],
          exercices: [],
          statut: 'prévue',
          niveauSeance: 'avancé'
        }
      ];
      
      this.filterSeances(this.currentFilter);
      this.isLoading = false;
    }, 1000);
  }
  
  filterSeances(filter: string): void {
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredSeances = [...this.seances];
    } else if (filter === 'upcoming') {
      this.filteredSeances = this.seances.filter(seance => 
        this.isUpcoming(seance.dateHeure)
      );
    } else if (filter === 'past') {
      this.filteredSeances = this.seances.filter(seance => 
        !this.isUpcoming(seance.dateHeure)
      );
    }
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  isUpcoming(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  }
  
  cancelSeance(seanceId: string): void {
    // In a real application, you would call a service to cancel the seance
    // For now, we'll just update the local state
    const seance = this.seances.find(s => s.id === seanceId);
    if (seance) {
      seance.statut = 'annulée';
      this.filterSeances(this.currentFilter);
    }
  }
} 
