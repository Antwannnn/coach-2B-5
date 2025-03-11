import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Coach } from '../../models/coach.model';
import { Seance } from '../../models/seance.model';
import { Sportif } from '../../models/sportif.model';

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
    id: '1',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@example.com',
    role: 'ROLE_COACH',
    specialites: ['cardio', 'fitness'],
    tarifHoraire: 50
  };
  
  upcomingSeances: Seance[] = [];
  sportifs: Sportif[] = [];
  totalRevenue = 0;
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    // In a real application, you would fetch this data from services
    // For now, we'll use mock data
    
    const now = new Date();
    
    // Mock sportifs
    this.sportifs = [
      {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        role: 'ROLE_SPORTIF',
        telephone: '0612345678',
        objectifs: 'Perdre du poids et améliorer mon endurance',
        dateInscription: '2023-01-15',
        niveauSportif: 'intermédiaire'
      },
      {
        id: '2',
        nom: 'Durand',
        prenom: 'Marie',
        email: 'marie.durand@example.com',
        role: 'ROLE_SPORTIF',
        telephone: '0687654321',
        objectifs: 'Renforcement musculaire et préparation marathon',
        dateInscription: '2023-02-20',
        niveauSportif: 'avancé'
      },
      {
        id: '3',
        nom: 'Petit',
        prenom: 'Pierre',
        email: 'pierre.petit@example.com',
        role: 'ROLE_SPORTIF',
        dateInscription: '2023-03-10',
        niveauSportif: 'débutant'
      }
    ];
    
    // Mock upcoming seances
    this.upcomingSeances = [
      {
        id: '1',
        dateHeure: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        typeSeance: 'solo',
        themeSeance: 'cardio',
        coach: this.coach,
        sportifs: [this.sportifs[0]],
        exercices: [],
        statut: 'prévue',
        niveauSeance: 'intermédiaire'
      },
      {
        id: '2',
        dateHeure: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
        typeSeance: 'duo',
        themeSeance: 'fitness',
        coach: this.coach,
        sportifs: [this.sportifs[1], this.sportifs[2]],
        exercices: [],
        statut: 'prévue',
        niveauSeance: 'débutant'
      },
      {
        id: '3',
        dateHeure: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        typeSeance: 'solo',
        themeSeance: 'muscu',
        coach: this.coach,
        sportifs: [this.sportifs[0]],
        exercices: [],
        statut: 'prévue',
        niveauSeance: 'avancé'
      }
    ];
    
    // Calculate mock revenue
    this.totalRevenue = this.coach.tarifHoraire * 10; // Assuming 10 hours this month
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
