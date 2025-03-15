import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sportif } from '../../models/sportif.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-coach-sportifs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sportifs.component.html',
  styleUrls: ['./sportifs.component.css']
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
