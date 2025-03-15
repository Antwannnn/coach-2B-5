import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar.component';
import { Coach } from '../../models/coach.model';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface FilterOptions {
  specialites: string[];
  tarifHoraire: string | null;
  disponibilites: string[];
  typeSeance: string[];
}

@Component({
  selector: 'app-coach-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, ReactiveFormsModule],
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {
  coaches: Coach[] = [];
  filteredCoaches: Coach[] = [];
  loading = false;
  error: string | null = null;
  filterForm: FormGroup;
  
  // Liste des spécialités disponibles
  specialites = ['Fitness', 'Cardio', 'Musculation', 'Crossfit'];
  
  // Plages de tarifs
  tarifRanges = [
    { id: 'price-1', label: 'Moins de 30€', min: 0, max: 30 },
    { id: 'price-2', label: '30€ - 50€', min: 30, max: 50 },
    { id: 'price-3', label: '50€ - 70€', min: 50, max: 70 },
    { id: 'price-4', label: 'Plus de 70€', min: 70, max: 1000 }
  ];
  
  // Disponibilités
  disponibilites = [
    { id: 'dispo-1', label: 'Matin (8h-12h)' },
    { id: 'dispo-2', label: 'Midi (12h-14h)' },
    { id: 'dispo-3', label: 'Après-midi (14h-18h)' },
    { id: 'dispo-4', label: 'Soir (18h-22h)' }
  ];
  
  // Types de séance
  typeSeances = [
    { id: 'type-1', label: 'Solo' },
    { id: 'type-2', label: 'Duo' },
    { id: 'type-3', label: 'Trio' }
  ];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      specialites: this.fb.group({
        'Fitness': [false],
        'Cardio': [false],
        'Musculation': [false],
        'Crossfit': [false]
      }),
      tarifHoraire: [''],
      disponibilites: this.fb.group({
        'Matin (8h-12h)': [false],
        'Midi (12h-14h)': [false],
        'Après-midi (14h-18h)': [false],
        'Soir (18h-22h)': [false]
      }),
      typeSeance: this.fb.group({
        'Solo': [false],
        'Duo': [false],
        'Trio': [false]
      })
    });
  }

  ngOnInit(): void {
    this.fetchCoaches();
  }

  fetchCoaches(): void {
    this.loading = true;
    this.error = null;
    
    this.apiService.get<Coach[]>('coachs').subscribe({
      next: (data) => {
        this.coaches = data;
        this.filteredCoaches = [...this.coaches];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching coaches:', err);
        this.error = 'Impossible de charger la liste des coachs. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const filters = this.getFilterValues();
    this.loading = true;
    
    // Préparer les paramètres pour l'API
    const params: any = {};
    
    // Ajouter les spécialités si sélectionnées
    if (filters.specialites.length > 0) {
      params.specialites = filters.specialites;
    }
    
    // Ajouter les plages de tarifs si sélectionnées
    if (filters.tarifHoraire) {
      const range = this.tarifRanges.find(r => r.id === filters.tarifHoraire);
      if (range) {
        params.tarifMin = range.min;
        params.tarifMax = range.max;
      }
    }
    
    // Appeler l'API avec les filtres
    this.apiService.get<Coach[]>('coachs', params).subscribe({
      next: (data) => {
        this.filteredCoaches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching filtered coaches:', err);
        this.error = 'Impossible de filtrer les coachs. Veuillez réessayer plus tard.';
        this.loading = false;
        // En cas d'erreur, on garde les coachs non filtrés
        this.filteredCoaches = [...this.coaches];
      }
    });
  }

  getFilterValues(): FilterOptions {
    const formValues = this.filterForm.value;
    
    // Extraire les spécialités sélectionnées
    const specialites: string[] = [];
    Object.entries(formValues.specialites).forEach(([key, value]) => {
      if (value) specialites.push(key);
    });
    
    // Extraire les disponibilités sélectionnées
    const disponibilites: string[] = [];
    Object.entries(formValues.disponibilites).forEach(([key, value]) => {
      if (value) disponibilites.push(key);
    });
    
    // Extraire les types de séance sélectionnés
    const typeSeance: string[] = [];
    Object.entries(formValues.typeSeance).forEach(([key, value]) => {
      if (value) typeSeance.push(key);
    });
    
    return {
      specialites,
      tarifHoraire: formValues.tarifHoraire,
      disponibilites,
      typeSeance
    };
  }
}
