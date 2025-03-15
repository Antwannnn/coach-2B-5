import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sportif } from '../../models/sportif.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-coach-sportifs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Mes Sportifs</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div *ngIf="isLoading" class="flex justify-center my-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        
        <div *ngIf="!isLoading && sportifs.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-lg">Vous n'avez pas encore de sportifs.</p>
        </div>
        
        <div *ngIf="!isLoading && sportifs.length > 0">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sportif
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Objectifs
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Séances
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let sportif of sportifs">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          {{ sportif.prenom.charAt(0) }}{{ sportif.nom.charAt(0) }}
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ sportif.prenom }} {{ sportif.nom }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ sportif.email }}</div>
                    <div *ngIf="sportif.telephone" class="text-sm text-gray-500">{{ sportif.telephone }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">{{ sportif.objectifs || 'Non défini' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ getSeancesCount(sportif) }} séances</div>
                    <div class="text-sm text-gray-500">
                      {{ getUpcomingSeancesCount(sportif) }} à venir
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      (click)="planifierSeance(sportif)"
                      class="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Planifier une séance
                    </button>
                    <button 
                      (click)="voirHistorique(sportif)"
                      class="text-gray-600 hover:text-gray-900"
                    >
                      Historique
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CoachSportifsComponent implements OnInit {
  sportifs: Sportif[] = [];
  isLoading = true;
  
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadSportifs();
  }
  
  loadSportifs(): void {
    const user = this.authService.getUser();
    if (!user) {
      this.isLoading = false;
      return;
    }
    
    this.userService.getSportifsByCoach(String(user.id))
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (sportifs) => {
          this.sportifs = sportifs;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des sportifs', error);
          // Fallback aux données mockées en cas d'erreur
          this.loadMockSportifs();
        }
      });
  }
  
  loadMockSportifs(): void {
    // Garder la méthode existante comme fallback
    setTimeout(() => {
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
          niveauSportif: 'intermédiaire',
          seances: [
            {
              id: '1',
              dateHeure: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
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
              dateHeure: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
              typeSeance: 'solo',
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
            }
          ]
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
          niveauSportif: 'avancé',
          seances: [
            {
              id: '3',
              dateHeure: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
              typeSeance: 'duo',
              themeSeance: 'muscu',
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
            }
          ]
        },
        {
          id: '3',
          nom: 'Petit',
          prenom: 'Pierre',
          email: 'pierre.petit@example.com',
          role: 'ROLE_SPORTIF',
          telephone: undefined,
          objectifs: undefined,
          dateInscription: '2023-03-10',
          niveauSportif: 'débutant',
          seances: []
        }
      ];
      
      this.isLoading = false;
    }, 1000);
  }
  
  getSeancesCount(sportif: Sportif): number {
    return sportif.seances?.length || 0;
  }
  
  getUpcomingSeancesCount(sportif: Sportif): number {
    const now = new Date();
    return sportif.seances?.filter(seance => 
      new Date(seance.dateHeure) > now
    ).length || 0;
  }
  
  planifierSeance(sportif: Sportif): void {
    // In a real application, you would navigate to a form or open a modal
    console.log('Planifier une séance pour', sportif.prenom, sportif.nom);
  }
  
  voirHistorique(sportif: Sportif): void {
    // In a real application, you would navigate to a history page
    console.log('Voir historique de', sportif.prenom, sportif.nom);
  }
} 