import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['ROLE_SPORTIF', Validators.required],
      // Champs spécifiques pour les coachs
      specialites: [[]],
      tarifHoraire: [0],
      // Champs spécifiques pour les sportifs
      niveauSportif: ['débutant'],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Met à jour le tableau des spécialités à partir de la chaîne saisie
   * @param event L'événement de changement
   */
  updateSpecialites(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    if (value) {
      // Diviser la chaîne par des virgules et supprimer les espaces
      const specialites = value.split(',').map(s => s.trim()).filter(s => s);
      this.registerForm.get('specialites')?.setValue(specialites);
    } else {
      this.registerForm.get('specialites')?.setValue([]);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = this.registerForm.value;
    const userData = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      nom: formData.nom,
      prenom: formData.prenom,
      // Ajouter des champs spécifiques au rôle
      ...(formData.role === 'coach' && {
        specialites: formData.specialites ? formData.specialites.split(',').map((s: string) => s.trim()) : [],
        tarifHoraire: formData.tarifHoraire,
        description: formData.description
      }),
      ...(formData.role === 'sportif' && {
        objectifs: formData.objectifs,
        niveau: formData.niveau
      })
    };

    this.authService.register(userData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (user: any) => {
          console.log('Inscription réussie', user);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Erreur d\'inscription', error);
          this.errorMessage = error.error?.message || 'Une erreur est survenue lors de l\'inscription.';
        }
      );
  }
}
