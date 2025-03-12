import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Seance, ThemeSeance, TypeSeance, NiveauSeance, SeanceCreation } from '../../models/seance.model';
import { Sportif } from '../../models/sportif.model';
import { SeanceService } from '../../services/seance.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-coach-seances',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Gestion des Séances</h1>
      
      <div class="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Créer une nouvelle séance</h2>
        
        <form [formGroup]="seanceForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label for="dateHeure" class="block text-sm font-medium text-gray-700 mb-1">Date et heure</label>
              <input 
                type="datetime-local" 
                id="dateHeure" 
                formControlName="dateHeure"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <div *ngIf="seanceForm.get('dateHeure')?.invalid && seanceForm.get('dateHeure')?.touched" class="text-red-500 text-sm mt-1">
                Date et heure requises
              </div>
            </div>
            
            <div>
              <label for="typeSeance" class="block text-sm font-medium text-gray-700 mb-1">Type de séance</label>
              <select 
                id="typeSeance" 
                formControlName="typeSeance"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un type</option>
                <option value="solo">Solo</option>
                <option value="duo">Duo</option>
                <option value="trio">Trio</option>
              </select>
              <div *ngIf="seanceForm.get('typeSeance')?.invalid && seanceForm.get('typeSeance')?.touched" class="text-red-500 text-sm mt-1">
                Type de séance requis
              </div>
            </div>
            
            <div>
              <label for="themeSeance" class="block text-sm font-medium text-gray-700 mb-1">Thème de séance</label>
              <select 
                id="themeSeance" 
                formControlName="themeSeance"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un thème</option>
                <option value="fitness">Fitness</option>
                <option value="cardio">Cardio</option>
                <option value="muscu">Musculation</option>
                <option value="crossfit">Crossfit</option>
              </select>
              <div *ngIf="seanceForm.get('themeSeance')?.invalid && seanceForm.get('themeSeance')?.touched" class="text-red-500 text-sm mt-1">
                Thème de séance requis
              </div>
            </div>
            
            <div>
              <label for="niveauSeance" class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              <select 
                id="niveauSeance" 
                formControlName="niveauSeance"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un niveau</option>
                <option value="débutant">Débutant</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="avancé">Avancé</option>
              </select>
              <div *ngIf="seanceForm.get('niveauSeance')?.invalid && seanceForm.get('niveauSeance')?.touched" class="text-red-500 text-sm mt-1">
                Niveau requis
              </div>
            </div>
            
            <div>
              <label for="sportifs" class="block text-sm font-medium text-gray-700 mb-1">Sportifs</label>
              <select 
                id="sportifs" 
                formControlName="sportifIds"
                multiple
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                size="3"
              >
                <option *ngFor="let sportif of sportifs" [value]="sportif.id">
                  {{ sportif.prenom }} {{ sportif.nom }}
                </option>
              </select>
              <div *ngIf="seanceForm.get('sportifIds')?.invalid && seanceForm.get('sportifIds')?.touched" class="text-red-500 text-sm mt-1">
                Sélectionnez au moins un sportif
              </div>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button 
              type="submit" 
              [disabled]="seanceForm.invalid || isSubmitting"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <span *ngIf="isSubmitting" class="inline-block mr-2">
                <span class="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full inline-block"></span>
              </span>
              Créer la séance
            </button>
          </div>
        </form>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-xl font-semibold">Mes séances</h2>
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
        
        <div *ngIf="isLoading" class="flex justify-center my-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        
        <div *ngIf="!isLoading && filteredSeances.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-lg">Aucune séance trouvée.</p>
        </div>
        
        <div *ngIf="!isLoading && filteredSeances.length > 0" class="space-y-4">
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
                <p class="text-sm text-gray-500">Type</p>
                <p>{{ seance.typeSeance }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Niveau</p>
                <p>{{ seance.niveauSeance }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Sportifs</p>
                <p>{{ seance.sportifs.length }} participant(s)</p>
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
              <button 
                *ngIf="seance.statut === 'prévue' && !isUpcoming(seance.dateHeure)"
                (click)="validateSeance(seance.id)"
                class="px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm hover:bg-green-100"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CoachSeancesComponent implements OnInit {
  seanceForm!: FormGroup;
  seances: Seance[] = [];
  filteredSeances: Seance[] = [];
  sportifs: Sportif[] = [];
  isLoading = true;
  isSubmitting = false;
  currentFilter = 'upcoming';
  
  constructor(
    private fb: FormBuilder,
    private seanceService: SeanceService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.loadSportifs();
    this.loadSeances();
  }
  
  initForm(): void {
    this.seanceForm = this.fb.group({
      dateHeure: ['', Validators.required],
      typeSeance: ['', Validators.required],
      themeSeance: ['', Validators.required],
      niveauSeance: ['', Validators.required],
      sportifIds: [[], Validators.required],
    });
  }
  
  loadSportifs(): void {
    const coachId = this.authService.getUser()?.id;
    
    if (coachId) {
      this.userService.getSportifsByCoach(coachId.toString())
        .subscribe({
          next: (sportifs) => {
            this.sportifs = sportifs;
          },
          error: (error) => {
            console.error('Erreur lors du chargement des sportifs', error);
            this.loadMockSportifs();
          }
        });
    } else {
      this.loadMockSportifs();
    }
  }
  
  loadMockSportifs(): void {
    this.sportifs = [
      {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        role: 'ROLE_SPORTIF',
        dateInscription: '2023-01-15',
        niveauSportif: 'intermédiaire',
        seances: []
      },
      {
        id: '2',
        nom: 'Durand',
        prenom: 'Marie',
        email: 'marie.durand@example.com',
        role: 'ROLE_SPORTIF',
        dateInscription: '2023-02-20',
        niveauSportif: 'avancé',
        seances: []
      },
      {
        id: '3',
        nom: 'Petit',
        prenom: 'Pierre',
        email: 'pierre.petit@example.com',
        role: 'ROLE_SPORTIF',
        dateInscription: '2023-03-10',
        niveauSportif: 'débutant',
        seances: []
      }
    ];
  }
  
  loadSeances(): void {
    this.isLoading = true;
    
    const coachId = this.authService.getUser()?.id;
    
    if (coachId) {
      this.seanceService.getSeancesByCoach(coachId.toString())
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
            this.loadMockSeances();
            this.isLoading = false;
          }
        });
    } else {
      this.loadMockSeances();
      this.isLoading = false;
    }
  }
  
  loadMockSeances(): void {
    this.seances = [
      {
        id: '1',
        dateHeure: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
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
        sportifs: [this.sportifs[0]],
        exercices: [],
        statut: 'prévue',
        niveauSeance: 'intermédiaire'
      },
      {
        id: '2',
        dateHeure: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
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
        sportifs: [this.sportifs[1], this.sportifs[2]],
        exercices: [],
        statut: 'validée',
        niveauSeance: 'débutant'
      },
      {
        id: '3',
        dateHeure: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        typeSeance: 'solo',
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
        sportifs: [this.sportifs[0]],
        exercices: [],
        statut: 'prévue',
        niveauSeance: 'avancé'
      }
    ];
    this.filterSeances(this.currentFilter);
  }
  
  filterSeances(filter: string): void {
    this.currentFilter = filter;
    const now = new Date();
    
    switch (filter) {
      case 'upcoming':
        this.filteredSeances = this.seances.filter(seance => 
          new Date(seance.dateHeure) > now
        );
        break;
      case 'past':
        this.filteredSeances = this.seances.filter(seance => 
          new Date(seance.dateHeure) <= now
        );
        break;
      case 'all':
      default:
        this.filteredSeances = [...this.seances];
        break;
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
    if (confirm('Êtes-vous sûr de vouloir annuler cette séance ?')) {
      this.seanceService.cancelSeance(seanceId)
        .subscribe({
          next: () => {
            const index = this.seances.findIndex(s => s.id === seanceId);
            if (index !== -1) {
              this.seances[index] = { ...this.seances[index], statut: 'annulée' };
              this.filterSeances(this.currentFilter);
            }
          },
          error: (error) => {
            console.error('Erreur lors de l\'annulation de la séance', error);
          }
        });
    }
  }
  
  validateSeance(seanceId: string): void {
    this.seanceService.validateSeance(seanceId)
      .subscribe({
        next: () => {
          const index = this.seances.findIndex(s => s.id === seanceId);
          if (index !== -1) {
            this.seances[index] = { ...this.seances[index], statut: 'validée' };
            this.filterSeances(this.currentFilter);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la validation de la séance', error);
        }
      });
  }
  
  onSubmit(): void {
    if (this.seanceForm.invalid) {
      Object.keys(this.seanceForm.controls).forEach(key => {
        this.seanceForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    
    const formValues = this.seanceForm.value;
    
    const seanceData: SeanceCreation = {
      dateHeure: formValues.dateHeure,
      typeSeance: formValues.typeSeance,
      themeSeance: formValues.themeSeance,
      niveauSeance: formValues.niveauSeance,
      statut: 'prévue',
      exercices: [],
      sportifIds: formValues.sportifIds,
      coachId: this.authService.getUser()?.id?.toString() || ''
    };
    
    this.seanceService.createSeance(seanceData)
      .pipe(finalize(() => {
        this.isSubmitting = false;
      }))
      .subscribe({
        next: (seance) => {
          this.seances = [seance, ...this.seances];
          this.filterSeances(this.currentFilter);
          
          this.seanceForm.reset();
          this.initForm();
        },
        error: (error) => {
          console.error('Erreur lors de la création de la séance', error);
        }
      });
  }
} 