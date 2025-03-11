import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-responsable-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Mon Profil</h1>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 flex items-center justify-center">
            <div class="relative w-24 h-24 overflow-hidden bg-white rounded-full flex items-center justify-center border-4 border-white">
              <span class="font-bold text-3xl text-indigo-700">{{ getUserInitials() }}</span>
            </div>
          </div>
          
          <div class="p-6">
            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">Informations personnelles</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input 
                    type="text" 
                    [(ngModel)]="userInfo.prenom" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input 
                    type="text" 
                    [(ngModel)]="userInfo.nom" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    [(ngModel)]="userInfo.email" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                  <input 
                    type="text" 
                    [value]="'Responsable'" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    disabled
                  >
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">Sécurité</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                  <input 
                    type="password" 
                    [(ngModel)]="newPassword" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    [(ngModel)]="confirmPassword" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-4">
              <button 
                (click)="resetForm()" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Annuler
              </button>
              <button 
                (click)="saveProfile()" 
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResponsableProfileComponent implements OnInit {
  userInfo: {
    prenom: string;
    nom: string;
    email: string;
  } = {
    prenom: '',
    nom: '',
    email: ''
  };
  
  newPassword: string = '';
  confirmPassword: string = '';
  
  private user = signal<User | null>(null);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    this.user.set(currentUser);
    
    if (currentUser) {
      this.userInfo = {
        prenom: currentUser.prenom || '',
        nom: currentUser.nom || '',
        email: currentUser.email || ''
      };
    }
  }
  
  getUserInitials(): string {
    if (this.userInfo.prenom && this.userInfo.nom) {
      return `${this.userInfo.prenom.charAt(0)}${this.userInfo.nom.charAt(0)}`.toUpperCase();
    }
    return '';
  }
  
  resetForm(): void {
    const currentUser = this.user();
    if (currentUser) {
      this.userInfo = {
        prenom: currentUser.prenom || '',
        nom: currentUser.nom || '',
        email: currentUser.email || ''
      };
    }
    this.newPassword = '';
    this.confirmPassword = '';
  }
  
  saveProfile(): void {
    // Vérifier si les mots de passe correspondent
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    
    // Dans une application réelle, vous enverriez ces données à un service
    console.log('Profil mis à jour:', this.userInfo);
    if (this.newPassword) {
      console.log('Mot de passe mis à jour');
    }
    
    // Simuler une mise à jour réussie
    alert('Profil mis à jour avec succès!');
  }
} 