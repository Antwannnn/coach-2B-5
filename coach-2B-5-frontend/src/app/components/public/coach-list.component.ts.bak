import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar.component';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-coach-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-indigo-700 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
          >
            Nos coachs experts
          </h1>
          <p class="mt-5 max-w-xl mx-auto text-xl text-indigo-100">
            Découvrez notre équipe de professionnels qualifiés prêts à vous
            accompagner dans votre parcours sportif.
          </p>
        </div>
      </div>
    </div>

    <!-- Coach List -->
    <div class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            *ngFor="let coach of coaches"
            class="bg-white overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105"
          >
            <div class="relative pb-2/3">
              <img
                [src]="coach.imageUrl"
                [alt]="coach.prenom + ' ' + coach.nom"
                class="absolute h-full w-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900">
                {{ coach.prenom }} {{ coach.nom }}
              </h3>
              <div class="mt-2 flex items-center">
                <span class="text-indigo-600 font-medium"
                  >{{ coach.tarifHoraire }}€/heure</span
                >
                <span class="mx-2 text-gray-500">•</span>
                <span class="text-gray-500">{{
                  coach.specialites.join(', ')
                }}</span>
              </div>
              <p class="mt-3 text-base text-gray-500">
                {{ coach.description }}
              </p>
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-900">Spécialités:</h4>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    *ngFor="let specialite of coach.specialites"
                    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {{ specialite }}
                  </span>
                </div>
              </div>
              <div class="mt-6">
                <a
                  routerLink="/coachs/{{ coach.id }}"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Voir le profil
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2
            class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
          >
            Filtrer
          </h2>
          <p
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Trouvez le coach idéal
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Utilisez nos filtres pour trouver le coach qui correspond à vos
            besoins spécifiques.
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="bg-white shadow-md rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900">Spécialité</h3>
              <div class="mt-4 space-y-4">
                <div class="flex items-center">
                  <input
                    id="filter-fitness"
                    name="specialite"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-fitness" class="ml-3 text-sm text-gray-700"
                    >Fitness</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-cardio"
                    name="specialite"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-cardio" class="ml-3 text-sm text-gray-700"
                    >Cardio</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-muscu"
                    name="specialite"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-muscu" class="ml-3 text-sm text-gray-700"
                    >Musculation</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-crossfit"
                    name="specialite"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    for="filter-crossfit"
                    class="ml-3 text-sm text-gray-700"
                    >Crossfit</label
                  >
                </div>
              </div>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900">Tarif horaire</h3>
              <div class="mt-4 space-y-4">
                <div class="flex items-center">
                  <input
                    id="filter-price-1"
                    name="price"
                    type="radio"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label for="filter-price-1" class="ml-3 text-sm text-gray-700"
                    >Moins de 30€</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-price-2"
                    name="price"
                    type="radio"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label for="filter-price-2" class="ml-3 text-sm text-gray-700"
                    >30€ - 50€</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-price-3"
                    name="price"
                    type="radio"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label for="filter-price-3" class="ml-3 text-sm text-gray-700"
                    >50€ - 70€</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-price-4"
                    name="price"
                    type="radio"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label for="filter-price-4" class="ml-3 text-sm text-gray-700"
                    >Plus de 70€</label
                  >
                </div>
              </div>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900">Disponibilité</h3>
              <div class="mt-4 space-y-4">
                <div class="flex items-center">
                  <input
                    id="filter-dispo-1"
                    name="dispo"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-dispo-1" class="ml-3 text-sm text-gray-700"
                    >Matin (8h-12h)</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-dispo-2"
                    name="dispo"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-dispo-2" class="ml-3 text-sm text-gray-700"
                    >Midi (12h-14h)</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-dispo-3"
                    name="dispo"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-dispo-3" class="ml-3 text-sm text-gray-700"
                    >Après-midi (14h-18h)</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-dispo-4"
                    name="dispo"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-dispo-4" class="ml-3 text-sm text-gray-700"
                    >Soir (18h-22h)</label
                  >
                </div>
              </div>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900">Type de séance</h3>
              <div class="mt-4 space-y-4">
                <div class="flex items-center">
                  <input
                    id="filter-type-1"
                    name="type"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-type-1" class="ml-3 text-sm text-gray-700"
                    >Solo</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-type-2"
                    name="type"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-type-2" class="ml-3 text-sm text-gray-700"
                    >Duo</label
                  >
                </div>
                <div class="flex items-center">
                  <input
                    id="filter-type-3"
                    name="type"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="filter-type-3" class="ml-3 text-sm text-gray-700"
                    >Trio</label
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex justify-center">
            <button
              type="button"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Appliquer les filtres
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CoachListComponent implements OnInit {
  coaches: Coach[] = [
    {
      id: '1',
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@coachapp.com',
      role: 'ROLE_COACH',
      specialites: ['Fitness', 'Cardio'],
      tarifHoraire: 45,
      imageUrl:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      description:
        "Coach spécialisé en fitness et cardio avec 5 ans d'expérience.",
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@coachapp.com',
      role: 'ROLE_COACH',
      specialites: ['Musculation', 'Crossfit'],
      tarifHoraire: 55,
      imageUrl:
        'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      description:
        'Experte en musculation et crossfit, Sophie vous aide à atteindre vos objectifs.',
    },
    {
      id: '3',
      nom: 'Petit',
      prenom: 'Thomas',
      email: 'thomas.petit@coachapp.com',
      role: 'ROLE_COACH',
      specialites: ['Fitness', 'Musculation'],
      tarifHoraire: 40,
      imageUrl:
        'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      description:
        'Coach polyvalent avec une approche personnalisée pour chaque client.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
