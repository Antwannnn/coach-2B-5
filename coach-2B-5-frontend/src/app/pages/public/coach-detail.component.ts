import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar.component';
import { Coach } from '../../models/coach.model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-coach-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, ReactiveFormsModule],
  templateUrl: './coach-detail.component.html',
  styleUrls: ['./coach-detail.component.css']
})
export class CoachDetailComponent implements OnInit {
  coach: Coach | null = null;
  loading = false;
  error: string | null = null;
  showBookingForm = false;
  bookingForm: FormGroup;
  isAuthenticated = false;
  isSubmitting = false;
  bookingSuccess = false;
  bookingError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['60', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    
    // Vérifier si l'utilisateur est connecté
    this.isAuthenticated = this.authService.isAuthenticated();
    
    if (!id) {
      this.error = 'Identifiant du coach non trouvé.';
      this.loading = false;
      return;
    }
    
    this.apiService.get<Coach>(`coachs/${id}`).subscribe({
      next: (data) => {
        this.coach = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching coach details:', err);
        this.error = 'Impossible de charger les détails du coach. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    });
  }

  toggleBookingForm(): void {
    this.showBookingForm = !this.showBookingForm;
    this.bookingSuccess = false;
    this.bookingError = null;
  }

  redirectToLogin(): void {
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: this.router.url } 
    });
  }

  bookSession(): void {
    if (this.bookingForm.invalid || !this.coach) {
      return;
    }
    
    this.isSubmitting = true;
    this.bookingSuccess = false;
    this.bookingError = null;
    
    const formValues = this.bookingForm.value;
    const seanceData = {
      coachId: this.coach.id,
      date: formValues.date,
      heure: formValues.time,
      duree: parseInt(formValues.duration, 10),
      notes: formValues.notes
    };
    
    this.apiService.post('seances', seanceData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.bookingSuccess = true;
        this.bookingForm.reset({
          duration: '60'
        });
      },
      error: (err) => {
        console.error('Error booking session:', err);
        this.isSubmitting = false;
        this.bookingError = 'Impossible de réserver la séance. Veuillez réessayer plus tard.';
      }
    });
  }
} 