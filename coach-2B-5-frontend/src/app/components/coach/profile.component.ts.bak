import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Coach } from '../../models/coach.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-coach-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Mon Profil</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div *ngIf="isLoading" class="flex justify-center my-8">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        
        <div *ngIf="!isLoading">
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="prenom" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input 
                  type="text" 
                  id="prenom" 
                  formControlName="prenom"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input 
                  type="text" 
                  id="nom" 
                  formControlName="nom"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label for="tarifHoraire" class="block text-sm font-medium text-gray-700 mb-1">Tarif horaire (€)</label>
                <input 
                  type="number" 
                  id="tarifHoraire" 
                  formControlName="tarifHoraire"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Spécialités</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div *ngFor="let specialite of availableSpecialites" class="flex items-center">
                  <input 
                    type="checkbox" 
                    [id]="'specialite-' + specialite" 
                    [value]="specialite"
                    (change)="toggleSpecialite(specialite)"
                    [checked]="selectedSpecialites.includes(specialite)"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label [for]="'specialite-' + specialite" class="ml-2 text-sm text-gray-700">
                    {{ specialite }}
                  </label>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button 
                type="submit" 
                [disabled]="profileForm.invalid || isSubmitting"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <span *ngIf="isSubmitting" class="inline-block mr-2">
                  <span class="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full inline-block"></span>
                </span>
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
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