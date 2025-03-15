import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Coach } from '../../models/coach.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-responsable-coachs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './coachs.component.html',
  styleUrls: ['./coachs.component.css']
})
export class ResponsableCoachsComponent implements OnInit {
  coaches: Coach[] = [];
  isLoading = true;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadCoachs();
  }
  
  loadCoachs(): void {
    this.isLoading = true;
    
    this.userService.getAllCoachs()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (coachs) => {
          this.coaches = coachs;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des coachs', error);
          // Fallback aux données mockées en cas d'erreur
          this.loadMockCoachs();
        }
      });
  }
  
  loadMockCoachs(): void {
    // Garder les données mockées existantes pour le fallback
    this.coaches = [
      {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Musculation'],
        tarifHoraire: 45,
        description: 'Coach spécialisé en musculation et remise en forme',
        createdAt: '2023-01-15',
        sportifs: [],
        firstName: 'Jean',
        lastName: 'Dupont',
        speciality: 'Musculation',
      },
      {
        id: '2',
        nom: 'Laurent',
        prenom: 'Marie',
        email: 'marie.laurent@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Yoga'],
        tarifHoraire: 40,
        description: 'Coach de yoga et méditation',
        createdAt: '2023-02-20',
        sportifs: [],
        firstName: 'Marie',
        lastName: 'Laurent',
        speciality: 'Yoga',
      },
      {
        id: '3',
        nom: 'Martin',
        prenom: 'Thomas',
        email: 'thomas.martin@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Cardio'],
        tarifHoraire: 42,
        description: 'Spécialiste en entraînement cardio-vasculaire',
        createdAt: '2023-03-10',
        sportifs: [],
        firstName: 'Thomas',
        lastName: 'Martin',
        speciality: 'Cardio',
      },
    ];
  }
  
  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Date inconnue';
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }
  
  viewCoach(coach: Coach): void {
    this.router.navigate(['/responsable/coachs', coach.id]);
  }
  
  editCoach(coach: Coach): void {
    this.router.navigate(['/responsable/coachs', coach.id, 'edit']);
  }
  
  addCoach(): void {
    this.router.navigate(['/responsable/coachs/new']);
  }
}
