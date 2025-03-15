import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Sportif } from '../../models/sportif.model';
import { Seance } from '../../models/seance.model';
import { UserService } from '../../services/user.service';
import { SeanceService } from '../../services/seance.service';
import { AuthService } from '../../services/auth.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-sportif-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class SportifDashboardComponent implements OnInit {
  sportif: Sportif | null = null;
  upcomingSeances: Seance[] = [];
  completedSeances: Seance[] = [];
  cancelledSeances: Seance[] = [];
  isLoading = true;
  error = '';

  constructor(
    private userService: UserService,
    private seanceService: SeanceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les données du sportif et ses séances depuis l'API
   */
  loadData(): void {
    this.isLoading = true;
    this.error = '';

    const userId = this.authService.getUser()?.id;
    
    if (!userId) {
      this.error = 'Utilisateur non connecté';
      this.isLoading = false;
      return;
    }

    // Utiliser forkJoin pour récupérer à la fois le profil et les séances
    forkJoin({
      profile: this.userService.getSportifProfile(userId.toString()),
      seances: this.seanceService.getSeancesBySportif(userId.toString())
    })
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (data) => {
        this.sportif = data.profile;
        
        // Adapter les données de l'API aux attentes du frontend
        const seances = data.seances.map(seance => {
          // Adapter le statut si nécessaire
          let statut: 'prévue' | 'validée' | 'annulée' = 'prévue';
          if (seance.statut as any === 'En cours') {
            statut = 'prévue';
          } else if (seance.statut as any === 'Terminée' || seance.statut as any === 'Validée') {
            statut = 'validée';
          } else if (seance.statut as any === 'Annulée') {
            statut = 'annulée';
          }

          // Adapter le type de séance si nécessaire
          let typeSeance: 'solo' | 'duo' | 'trio' = 'solo';
          if (seance.typeSeance as any === 'duo' || seance.typeSeance as any === 'Duo') {
            typeSeance = 'duo';
          } else if (seance.typeSeance as any === 'trio' || seance.typeSeance as any === 'Trio') {
            typeSeance = 'trio';
          }

          // Adapter le thème de séance si nécessaire
          let themeSeance: 'fitness' | 'cardio' | 'muscu' | 'crossfit' = 'fitness';
          if (seance.themeSeance as any === 'cardio' || seance.themeSeance as any === 'Cardio') {
            themeSeance = 'cardio';
          } else if (seance.themeSeance as any === 'muscu' || seance.themeSeance as any === 'Musculation') {
            themeSeance = 'muscu';
          } else if (seance.themeSeance as any === 'crossfit' || seance.themeSeance as any === 'Crossfit') {
            themeSeance = 'crossfit';
          }

          // Adapter le niveau de séance si nécessaire
          let niveauSeance: 'débutant' | 'intermédiaire' | 'avancé' = 'débutant';
          if (seance.niveauSeance as any === 'Intermédiaire' || seance.niveauSeance as any === 'intermédiaire') {
            niveauSeance = 'intermédiaire';
          } else if (seance.niveauSeance as any === 'Avancé' || seance.niveauSeance as any === 'avancé') {
            niveauSeance = 'avancé';
          }

          return {
            ...seance,
            statut,
            typeSeance,
            themeSeance,
            niveauSeance,
            // S'assurer que les exercices sont définis
            exercices: seance.exercices || []
          };
        });
        
        // Trier les séances par statut et date
        const now = new Date();
        
        this.upcomingSeances = seances
          .filter(seance => 
            seance.statut === 'prévue' && 
            new Date(seance.dateHeure) > now
          )
          .sort((a, b) => 
            new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime()
          );
        
        this.completedSeances = seances
          .filter(seance => seance.statut === 'validée')
          .sort((a, b) => 
            new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
          );
        
        this.cancelledSeances = seances
          .filter(seance => seance.statut === 'annulée')
          .sort((a, b) => 
            new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
          );

        // Si aucune séance n'est trouvée, charger des données fictives pour le développement
        if (seances.length === 0) {
          this.loadMockData();
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données', err);
        this.error = 'Erreur lors du chargement des données. Veuillez réessayer.';
        // Charger des données fictives pour le développement
        this.loadMockData();
      }
    });
  }

  /**
   * Charge des données fictives pour le développement
   */
  loadMockData(): void {
    this.sportif = {
      id: '1',
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      role: 'ROLE_SPORTIF',
      dateInscription: '2023-01-15',
      niveauSportif: 'intermédiaire',
      telephone: '0612345678',
      objectifs: 'Améliorer mon endurance',
      actif: true,
      nombreSeances: 12
    };

    const mockCoach = {
      id: '2',
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      role: 'ROLE_COACH' as 'ROLE_COACH',
      specialites: ['cardio', 'fitness'],
      tarifHoraire: 50
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 30);

    this.upcomingSeances = [
      {
        id: '1',
        dateHeure: tomorrow.toISOString(),
        typeSeance: 'solo',
        themeSeance: 'cardio',
        coach: mockCoach,
        sportifs: [this.sportif],
        exercices: [],
        statut: 'prévue',
        niveauSeance: 'intermédiaire'
      },
      {
        id: '2',
        dateHeure: nextWeek.toISOString(),
        typeSeance: 'duo',
        themeSeance: 'fitness',
        coach: mockCoach,
        sportifs: [this.sportif, {
          id: '3',
          nom: 'Durand',
          prenom: 'Marie',
          email: 'marie.durand@example.com',
          role: 'ROLE_SPORTIF',
          dateInscription: '2023-02-10',
          niveauSportif: 'débutant'
        }],
        exercices: [],
        statut: 'prévue',
        niveauSeance: 'débutant'
      }
    ];

    this.completedSeances = [
      {
        id: '3',
        dateHeure: lastWeek.toISOString(),
        typeSeance: 'solo',
        themeSeance: 'muscu',
        coach: mockCoach,
        sportifs: [this.sportif],
        exercices: [],
        statut: 'validée',
        niveauSeance: 'intermédiaire'
      }
    ];

    this.cancelledSeances = [
      {
        id: '4',
        dateHeure: lastMonth.toISOString(),
        typeSeance: 'solo',
        themeSeance: 'crossfit',
        coach: mockCoach,
        sportifs: [this.sportif],
        exercices: [],
        statut: 'annulée',
        niveauSeance: 'avancé'
      }
    ];
  }

  /**
   * Annule une séance
   * @param seanceId ID de la séance à annuler
   */
  cancelSeance(seanceId: string): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette séance ?')) {
      this.seanceService.cancelSeance(seanceId)
        .subscribe({
          next: (updatedSeance) => {
            // Mettre à jour les listes de séances
            this.upcomingSeances = this.upcomingSeances.filter(s => s.id !== seanceId);
            this.cancelledSeances = [updatedSeance, ...this.cancelledSeances];
          },
          error: (err) => {
            console.error('Erreur lors de l\'annulation de la séance', err);
            alert('Erreur lors de l\'annulation de la séance. Veuillez réessayer.');
          }
        });
    }
  }

  /**
   * Navigue vers la page de réservation
   */
  goToReservation(): void {
    this.router.navigate(['/sportif/reserver']);
  }

  /**
   * Navigue vers la page d'historique
   */
  goToHistory(): void {
    this.router.navigate(['/sportif/historique']);
  }

  /**
   * Navigue vers la page de profil
   */
  goToProfile(): void {
    this.router.navigate(['/sportif/profil']);
  }

  /**
   * Formate une date pour l'affichage
   * @param dateString Date au format ISO
   * @returns Date formatée
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Formate une date et heure pour l'affichage
   * @param dateString Date au format ISO
   * @returns Date et heure formatées
   */
  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
