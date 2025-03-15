import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-responsable-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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
