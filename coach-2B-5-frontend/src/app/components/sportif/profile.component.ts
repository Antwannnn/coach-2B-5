import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sportif } from '../../models/sportif.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sportif-profile',
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
                <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input 
                  type="tel" 
                  id="telephone" 
                  formControlName="telephone"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>
            
            <div>
              <label for="objectifs" class="block text-sm font-medium text-gray-700 mb-1">Objectifs</label>
              <textarea 
                id="objectifs" 
                formControlName="objectifs"
                rows="3"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
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
export class SportifProfileComponent implements OnInit {
  profileForm!: FormGroup;
  sportif: Sportif | null = null;
  isLoading = true;
  isSubmitting = false;
  
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
      telephone: [''],
      objectifs: ['']
    });
  }
  
  loadProfile(): void {
    this.isLoading = true;
    // In a real application, you would fetch the sportif profile from a service
    // For now, we'll use mock data
    setTimeout(() => {
      this.sportif = {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        role: 'ROLE_SPORTIF',
        telephone: '0612345678',
        objectifs: 'Perdre du poids et améliorer mon endurance',
        dateInscription: '2023-01-15',
        niveauSportif: 'intermédiaire',
        seances: []
      };
      
      this.profileForm.patchValue({
        prenom: this.sportif.prenom,
        nom: this.sportif.nom,
        email: this.sportif.email,
        telephone: this.sportif.telephone,
        objectifs: this.sportif.objectifs
      });
      
      this.isLoading = false;
    }, 1000);
  }
  
  onSubmit(): void {
    if (this.profileForm.invalid) return;
    
    this.isSubmitting = true;
    
    // In a real application, you would send the updated profile to a service
    // For now, we'll simulate a successful update
    setTimeout(() => {
      this.isSubmitting = false;
      // Show success message or handle response
      console.log('Profile updated', this.profileForm.value);
    }, 1000);
  }
} 