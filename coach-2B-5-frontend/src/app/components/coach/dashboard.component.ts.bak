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
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Tableau de bord</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-2">Séances à venir</h2>
          <p class="text-3xl font-bold text-blue-600">{{ upcomingSeances.length }}</p>
          <p class="text-sm text-gray-500 mt-1">Cette semaine</p>
          <div class="mt-4">
            <a 
              routerLink="/coach/seances" 
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Voir toutes les séances →
            </a>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-2">Mes sportifs</h2>
          <p class="text-3xl font-bold text-blue-600">{{ sportifs.length }}</p>
          <p class="text-sm text-gray-500 mt-1">Sportifs actifs</p>
          <div class="mt-4">
            <a 
              routerLink="/coach/sportifs" 
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Gérer mes sportifs →
            </a>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-2">Revenus</h2>
          <p class="text-3xl font-bold text-green-600">{{ totalRevenue }}€</p>
          <p class="text-sm text-gray-500 mt-1">Ce mois-ci</p>
          <div class="mt-4">
            <a 
              routerLink="/coach/profile" 
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Voir mon profil →
            </a>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Prochaines séances</h2>
            <a 
              routerLink="/coach/seances" 
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Voir tout →
            </a>
          </div>
          
          <div *ngIf="upcomingSeances.length === 0" class="text-center py-8">
            <p class="text-gray-500">Aucune séance à venir</p>
          </div>
          
          <div *ngIf="upcomingSeances.length > 0" class="space-y-4">
            <div 
              *ngFor="let seance of upcomingSeances.slice(0, 3)" 
              class="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold text-lg">
                    Séance de {{ seance.themeSeance }}
                  </h3>
                  <p class="text-gray-600">
                    {{ formatDateTime(seance.dateHeure) }}
                  </p>
                </div>
                
                <div 
                  class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  {{ seance.typeSeance }}
                </div>
              </div>
              
              <div class="mt-3">
                <p class="text-sm text-gray-500">Sportifs</p>
                <div class="flex flex-wrap gap-2 mt-1">
                  <div 
                    *ngFor="let sportif of seance.sportifs" 
                    class="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {{ sportif.prenom }} {{ sportif.nom }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Mes sportifs</h2>
            <a 
              routerLink="/coach/sportifs" 
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Voir tout →
            </a>
          </div>
          
          <div *ngIf="sportifs.length === 0" class="text-center py-8">
            <p class="text-gray-500">Aucun sportif</p>
          </div>
          
          <div *ngIf="sportifs.length > 0" class="space-y-4">
            <div 
              *ngFor="let sportif of sportifs.slice(0, 5)" 
              class="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  {{ sportif.prenom.charAt(0) }}{{ sportif.nom.charAt(0) }}
                </div>
                <div class="ml-4">
                  <p class="font-medium">{{ sportif.prenom }} {{ sportif.nom }}</p>
                  <p class="text-sm text-gray-500">{{ sportif.email }}</p>
                </div>
              </div>
              
              <div>
                <button 
                  (click)="planifierSeance(sportif)"
                  class="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100"
                >
                  Planifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
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
