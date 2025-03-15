import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sportif } from '../../models/sportif.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sportif-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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
    
    const user = this.authService.getUser();
    if (!user) {
      this.isLoading = false;
      return;
    }
    
    this.userService.getSportifProfile(String(user.id))
      .subscribe({
        next: (sportif: Sportif) => {
          this.sportif = sportif;
          
          this.profileForm.patchValue({
            prenom: sportif.prenom,
            nom: sportif.nom,
            email: sportif.email,
            telephone: sportif.telephone,
            objectifs: sportif.objectifs
          });
          
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Erreur lors du chargement du profil', error);
          // Fallback aux données mockées en cas d'erreur
          this.loadMockProfile();
          this.isLoading = false;
        }
      });
  }
  
  loadMockProfile(): void {
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
  }
  
  onSubmit(): void {
    if (this.profileForm.invalid || !this.sportif) return;
    
    this.isSubmitting = true;
    
    const updatedSportif = {
      ...this.profileForm.value
    };
    
    this.userService.updateSportifProfile(String(this.sportif.id), updatedSportif)
      .subscribe({
        next: (sportif: Sportif) => {
          this.sportif = sportif;
          this.isSubmitting = false;
          
          // Mettre à jour les données de l'utilisateur dans le service d'authentification
          const user = this.authService.getUser();
          if (user) {
            const updatedUser = {
              ...user,
              nom: sportif.nom,
              prenom: sportif.prenom,
              email: sportif.email
            };
            this.authService.updateUserInStorage(updatedUser);
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour du profil', error);
          this.isSubmitting = false;
        }
      });
  }
} 
