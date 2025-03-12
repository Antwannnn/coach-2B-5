import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seance } from '../../models/seance.model';
import { SeanceService } from '../../services/seance.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sportif-seances',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Mes Séances</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div *ngIf="isLoading" class="flex justify-center my-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        
        <div *ngIf="!isLoading && seances.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-lg">Vous n'avez pas encore de séances programmées.</p>
          <p class="mt-2">Contactez votre coach pour planifier votre première séance.</p>
        </div>
        
        <div *ngIf="!isLoading && seances.length > 0">
          <div class="mb-6 flex justify-between items-center">
            <h2 class="text-xl font-semibold">Séances à venir</h2>
            <div class="flex space-x-2">
              <button 
                (click)="filterSeances('all')" 
                [class.bg-blue-600]="currentFilter === 'all'"
                [class.text-white]="currentFilter === 'all'"
                [class.bg-gray-100]="currentFilter !== 'all'"
                class="px-3 py-1 rounded-md text-sm font-medium"
              >
                Toutes
              </button>
              <button 
                (click)="filterSeances('upcoming')" 
                [class.bg-blue-600]="currentFilter === 'upcoming'"
                [class.text-white]="currentFilter === 'upcoming'"
                [class.bg-gray-100]="currentFilter !== 'upcoming'"
                class="px-3 py-1 rounded-md text-sm font-medium"
              >
                À venir
              </button>
              <button 
                (click)="filterSeances('past')" 
                [class.bg-blue-600]="currentFilter === 'past'"
                [class.text-white]="currentFilter === 'past'"
                [class.bg-gray-100]="currentFilter !== 'past'"
                class="px-3 py-1 rounded-md text-sm font-medium"
              >
                Passées
              </button>
            </div>
          </div>
          
          <div class="space-y-4">
            <div 
              *ngFor="let seance of filteredSeances" 
              class="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold text-lg">
                    Séance de {{ seance.themeSeance }}
                  </h3>
                  <p class="text-gray-600">
                    {{ formatDate(seance.dateHeure) }}
                  </p>
                </div>
                
                <div 
                  [class.bg-green-100]="seance.statut === 'validée'"
                  [class.text-green-800]="seance.statut === 'validée'"
                  [class.bg-yellow-100]="seance.statut === 'prévue'"
                  [class.text-yellow-800]="seance.statut === 'prévue'"
                  [class.bg-red-100]="seance.statut === 'annulée'"
                  [class.text-red-800]="seance.statut === 'annulée'"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                >
                  {{ seance.statut }}
                </div>
              </div>
              
              <div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p class="text-sm text-gray-500">Coach</p>
                  <p>{{ seance.coach.prenom }} {{ seance.coach.nom }}</p>
                </div>
                
                <div>
                  <p class="text-sm text-gray-500">Type</p>
                  <p>{{ seance.typeSeance }}</p>
                </div>
                
                <div>
                  <p class="text-sm text-gray-500">Niveau</p>
                  <p>{{ seance.niveauSeance }}</p>
                </div>
              </div>
              
              <div class="mt-4 flex justify-end space-x-2">
                <button 
                  *ngIf="seance.statut === 'prévue' && isUpcoming(seance.dateHeure)"
                  (click)="cancelSeance(seance.id)"
                  class="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
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