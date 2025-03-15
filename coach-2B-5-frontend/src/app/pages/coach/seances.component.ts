import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Seance, SeanceCreation } from '../../models/seance.model';
import { Sportif } from '../../models/sportif.model';
import { SeanceService } from '../../services/seance.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-coach-seances',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
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
