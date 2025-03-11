import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Seance } from '../../models/seance.model';
import { Sportif } from '../../models/sportif.model';

@Component({
  selector: 'app-sportif-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-indigo-600">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-white text-xl font-bold">CoachApp</span>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a
                    routerLink="/sportif/dashboard"
                    class="bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                    >Tableau de bord</a
                  >
                  <a
                    routerLink="/sportif/seances"
                    class="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                    >Mes séances</a
                  >
                  <a
                    routerLink="/sportif/historique"
                    class="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                    >Historique</a
                  >
                  <a
                    routerLink="/sportif/reserver"
                    class="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
                    >Réserver</a
                  >
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <div class="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      class="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span class="sr-only">Open user menu</span>
                      <span
                        class="h-8 w-8 rounded-full bg-indigo-700 flex items-center justify-center text-white"
                      >
                        {{ sportif.prenom.charAt(0)
                        }}{{ sportif.nom.charAt(0) }}
                      </span>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="ml-3 text-white hover:text-gray-200"
                >
                  <span class="sr-only">Déconnexion</span>
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <button
                type="button"
                class="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  class="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="md:hidden" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              routerLink="/sportif/dashboard"
              class="bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
              >Tableau de bord</a
            >
            <a
              routerLink="/sportif/seances"
              class="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-medium"
              >Mes séances</a
            >
            <a
              routerLink="/sportif/historique"
              class="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-medium"
              >Historique</a
            >
            <a
              routerLink="/sportif/reserver"
              class="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-medium"
              >Réserver</a
            >
          </div>
          <div class="pt-4 pb-3 border-t border-indigo-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <span
                  class="h-10 w-10 rounded-full bg-indigo-700 flex items-center justify-center text-white"
                >
                  {{ sportif.prenom.charAt(0) }}{{ sportif.nom.charAt(0) }}
                </span>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ sportif.prenom }} {{ sportif.nom }}
                </div>
                <div class="text-sm font-medium leading-none text-indigo-200">
                  {{ sportif.email }}
                </div>
              </div>
              <button
                type="button"
                class="ml-auto bg-indigo-600 flex-shrink-0 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
              >
                <span class="sr-only">Déconnexion</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        </div>
      </header>

      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Welcome section -->
          <div class="px-4 py-6 sm:px-0">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <h2 class="text-lg leading-6 font-medium text-gray-900">
                  Bienvenue, {{ sportif.prenom }} !
                </h2>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Niveau sportif :
                    <span class="font-medium">{{ sportif.niveauSportif }}</span>
                  </p>
                  <p>
                    Date d'inscription :
                    <span class="font-medium">{{
                      formatDate(sportif.dateInscription)
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats section -->
          <div class="mt-8">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Statistiques
              </h3>
            </div>
            <div
              class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <svg
                        class="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Séances à venir
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ upcomingSeances.length }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <svg
                        class="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Séances complétées
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ completedSeances.length }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 bg-red-500 rounded-md p-3">
                      <svg
                        class="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Séances annulées
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ cancelledSeances.length }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming sessions section -->
          <div class="mt-8">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Prochaines séances
              </h3>
            </div>
            <div class="mt-2 flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                  class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                >
                  <div
                    class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                  >
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date & Heure
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Thème
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Coach
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Statut
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr *ngFor="let seance of upcomingSeances">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{ formatDateTime(seance.dateHeure) }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{ seance.typeSeance }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{ seance.themeSeance }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{ seance.coach.prenom }} {{ seance.coach.nom }}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span
                              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                              [ngClass]="{
                                'bg-green-100 text-green-800':
                                  seance.statut === 'validée',
                                'bg-yellow-100 text-yellow-800':
                                  seance.statut === 'prévue',
                                'bg-red-100 text-red-800':
                                  seance.statut === 'annulée'
                              }"
                            >
                              {{ seance.statut }}
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                          >
                            <a
                              routerLink="/sportif/seances/{{ seance.id }}"
                              class="text-indigo-600 hover:text-indigo-900"
                              >Détails</a
                            >
                            <button
                              *ngIf="seance.statut === 'prévue'"
                              class="ml-3 text-red-600 hover:text-red-900"
                            >
                              Annuler
                            </button>
                          </td>
                        </tr>
                        <tr *ngIf="upcomingSeances.length === 0">
                          <td
                            colspan="6"
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                          >
                            Aucune séance à venir.
                            <a
                              routerLink="/sportif/reserver"
                              class="text-indigo-600 hover:text-indigo-900"
                              >Réserver une séance</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick actions section -->
          <div class="mt-8">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Actions rapides
              </h3>
            </div>
            <div
              class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Réserver une séance
                  </h3>
                  <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Consultez les créneaux disponibles et réservez une séance
                      avec un coach.
                    </p>
                  </div>
                  <div class="mt-5">
                    <a
                      routerLink="/sportif/reserver"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Réserver
                    </a>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Voir mon historique
                  </h3>
                  <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Consultez l'historique de vos séances passées et vos
                      performances.
                    </p>
                  </div>
                  <div class="mt-5">
                    <a
                      routerLink="/sportif/historique"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Voir l'historique
                    </a>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Modifier mon profil
                  </h3>
                  <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Mettez à jour vos informations personnelles et vos
                      préférences.
                    </p>
                  </div>
                  <div class="mt-5">
                    <a
                      routerLink="/sportif/profil"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Modifier
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [],
})
export class SportifDashboardComponent implements OnInit {
  sportif: Sportif = {
    id: '1',
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'marie.dubois@example.com',
    role: 'ROLE_SPORTIF',
    dateInscription: '2023-01-15',
    niveauSportif: 'intermédiaire',
  };

  upcomingSeances: Seance[] = [
    {
      id: '1',
      dateHeure: '2023-04-15T10:00:00',
      typeSeance: 'solo',
      themeSeance: 'fitness',
      coach: {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Fitness', 'Cardio'],
        tarifHoraire: 45,
      },
      sportifs: [],
      exercices: [],
      statut: 'prévue',
      niveauSeance: 'intermédiaire',
    },
    {
      id: '2',
      dateHeure: '2023-04-18T14:30:00',
      typeSeance: 'duo',
      themeSeance: 'cardio',
      coach: {
        id: '2',
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Musculation', 'Crossfit'],
        tarifHoraire: 55,
      },
      sportifs: [],
      exercices: [],
      statut: 'prévue',
      niveauSeance: 'intermédiaire',
    },
  ];

  completedSeances: Seance[] = [
    {
      id: '3',
      dateHeure: '2023-04-10T11:00:00',
      typeSeance: 'solo',
      themeSeance: 'muscu',
      coach: {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@coachapp.com',
        role: 'ROLE_COACH',
        specialites: ['Fitness', 'Cardio'],
        tarifHoraire: 45,
      },
      sportifs: [],
      exercices: [],
      statut: 'validée',
      niveauSeance: 'intermédiaire',
    },
  ];

  cancelledSeances: Seance[] = [];

  constructor() {}

  ngOnInit(): void {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}
