import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Coach } from '../../models/coach.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-coach-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class CoachProfileComponent implements OnInit {
  profileForm!: FormGroup;
  coach: Coach | null = null;
  isLoading = true;
  isSubmitting = false;
  
  availableSpecialites = ['fitness', 'cardio', 'muscu', 'crossfit'];
  selectedSpecialites: string[] = [];
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
  }
  
  initForm(): void {
    this.profileForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tarifHoraire: [0, [Validators.required, Validators.min(0)]]
    });
  }
  
  loadProfile(): void {
    this.isLoading = true;
    
    const user = this.authService.getUser();
    if (user && user.id) {
      this.userService.getCoachProfile(user.id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (coach) => {
            this.coach = coach;
            this.selectedSpecialites = [...coach.specialites];
            
            this.profileForm.patchValue({
              prenom: coach.prenom,
              nom: coach.nom,
              email: coach.email,
              tarifHoraire: coach.tarifHoraire
            });
          },
          error: (error) => {
            console.error('Erreur lors du chargement du profil:', error);
            // Afficher un message d'erreur à l'utilisateur
          }
        });
    } else {
      this.isLoading = false;
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      this.authService.logout();
    }
  }
  
  toggleSpecialite(specialite: string): void {
    if (this.selectedSpecialites.includes(specialite)) {
      this.selectedSpecialites = this.selectedSpecialites.filter(s => s !== specialite);
    } else {
      this.selectedSpecialites.push(specialite);
    }
  }
  
  onSubmit(): void {
    if (this.profileForm.invalid || !this.coach) return;
    
    this.isSubmitting = true;
    
    const updatedCoach: Partial<Coach> = {
      ...this.profileForm.value,
      specialites: this.selectedSpecialites
    };
    
    this.userService.updateCoachProfile(this.coach.id, updatedCoach)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: (coach) => {
          this.coach = coach;
          // Mettre à jour les données de l'utilisateur dans le service d'authentification
          const user = this.authService.getUser();
          if (user) {
            const updatedUser = {
              ...user,
              nom: coach.nom,
              prenom: coach.prenom,
              email: coach.email
            };
            localStorage.setItem('user_data', JSON.stringify(updatedUser));
          }
          
          // Afficher un message de succès
          alert('Profil mis à jour avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          // Afficher un message d'erreur à l'utilisateur
          alert('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
        }
      });
  }
} 
