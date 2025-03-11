import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-responsable-coachs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-teal-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-white text-xl font-bold">CoachApp</span>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a
                    routerLink="/responsable/coachs"
                    class="bg-teal-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                    >Coachs</a
                  >
                  <a
                    routerLink="/responsable/fiches-de-paie"
                    class="text-gray-300 hover:bg-teal-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Fiches de paie</a
                  >
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  class="bg-teal-800 p-1 rounded-full text-gray-200 hover:text-white focus:outline-none"
                >
                  <span class="sr-only">Voir les notifications</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <!-- Profile dropdown -->
                <div class="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      class="max-w-xs bg-teal-800 rounded-full flex items-center text-sm focus:outline-none"
                      id="user-menu-button"
                    >
                      <span class="sr-only">Ouvrir le menu utilisateur</span>
                      <span
                        class="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold"
                      >
                        R
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Gestion des Coachs</h1>
        </div>
      </header>

      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Coach list -->
          <div class="px-4 py-6 sm:px-0">
            <div class="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" class="divide-y divide-gray-200">
                <li *ngFor="let coach of coaches">
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div
                          class="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold"
                        >
                          {{ coach.firstName.charAt(0)
                          }}{{ coach.lastName.charAt(0) }}
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-teal-600">
                            {{ coach.firstName }} {{ coach.lastName }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ coach.email }}
                          </div>
                        </div>
                      </div>
                      <div class="flex space-x-2">
                        <button
                          type="button"
                          class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none"
                        >
                          Voir
                        </button>
                        <button
                          type="button"
                          class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"
                        >
                          Éditer
                        </button>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <div class="flex items-center text-sm text-gray-500">
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          {{ coach.speciality }}
                        </div>
                        <div
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                        >
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          {{ coach.sportifs.length }} sportifs
                        </div>
                      </div>
                      <div
                        class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                      >
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          Inscrit le {{ formatDate(coach.createdAt) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Add coach button -->
            <div class="mt-6">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"
              >
                <svg
                  class="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Ajouter un coach
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [],
})
export class ResponsableCoachsComponent implements OnInit {
  coaches: Coach[] = [
    {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@coachapp.com',
      speciality: 'Musculation',
      description: 'Coach spécialisé en musculation et remise en forme',
      createdAt: '2023-01-15',
      sportifs: [1, 2, 3, 4],
      hourlyRate: 45,
    },
    {
      id: 2,
      firstName: 'Marie',
      lastName: 'Laurent',
      email: 'marie.laurent@coachapp.com',
      speciality: 'Yoga',
      description: 'Coach de yoga et méditation',
      createdAt: '2023-02-20',
      sportifs: [5, 6],
      hourlyRate: 40,
    },
    {
      id: 3,
      firstName: 'Thomas',
      lastName: 'Martin',
      email: 'thomas.martin@coachapp.com',
      speciality: 'Cardio',
      description: 'Spécialiste en entraînement cardio-vasculaire',
      createdAt: '2023-03-10',
      sportifs: [7, 8, 9],
      hourlyRate: 42,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }
}
