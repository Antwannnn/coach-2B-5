import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Coach } from '../../models/coach.model';
import { Seance } from '../../models/seance.model';

@Component({
  selector: 'app-coach-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-purple-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <span class="text-white text-xl font-bold">CoachApp</span>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a
                    routerLink="/coach/dashboard"
                    class="bg-purple-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                    >Tableau de bord</a
                  >
                  <a
                    routerLink="/coach/seances"
                    class="text-white hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >Mes séances</a
                  >
                  <a
                    routerLink="/coach/exercices"
                    class="text-white hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >Exercices</a
                  >
                  <a
                    routerLink="/coach/planning"
                    class="text-white hover:bg-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >Planning</a
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
                      class="max-w-xs bg-purple-700 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span class="sr-only">Open user menu</span>
                      <span
                        class="h-8 w-8 rounded-full bg-purple-800 flex items-center justify-center text-white"
                      >
                        {{ coach.prenom.charAt(0) }}{{ coach.nom.charAt(0) }}
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
                class="bg-purple-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
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
              routerLink="/coach/dashboard"
              class="bg-purple-800 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
              >Tableau de bord</a
            >
            <a
              routerLink="/coach/seances"
              class="text-white hover:bg-purple-600 block px-3 py-2 rounded-md text-base font-medium"
              >Mes séances</a
            >
            <a
              routerLink="/coach/exercices"
              class="text-white hover:bg-purple-600 block px-3 py-2 rounded-md text-base font-medium"
              >Exercices</a
            >
            <a
              routerLink="/coach/planning"
              class="text-white hover:bg-purple-600 block px-3 py-2 rounded-md text-base font-medium"
              >Planning</a
            >
          </div>
          <div class="pt-4 pb-3 border-t border-purple-800">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <span
                  class="h-10 w-10 rounded-full bg-purple-800 flex items-center justify-center text-white"
                >
                  {{ coach.prenom.charAt(0) }}{{ coach.nom.charAt(0) }}
                </span>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ coach.prenom }} {{ coach.nom }}
                </div>
                <div class="text-sm font-medium leading-none text-purple-200">
                  {{ coach.email }}
                </div>
              </div>
              <button
                type="button"
                class="ml-auto bg-purple-700 flex-shrink-0 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
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
                  Bienvenue, {{ coach.prenom }} !
                </h2>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Spécialités :
                    <span class="font-medium">{{
                      coach.specialites.join(', ')
                    }}</span>
                  </p>
                  <p>
                    Tarif horaire :
                    <span class="font-medium">{{ coach.tarifHoraire }}€</span>
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
                    <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
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
                    <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Revenus du mois
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ calculateMonthlyRevenue() }}€
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Today's sessions section -->
          <div class="mt-8">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Séances d'aujourd'hui
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
                            Heure
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
                            Sportifs
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
                        <tr *ngFor="let seance of todaySeances">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              {{ formatTime(seance.dateHeure) }}
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
                              <span *ngIf="seance.sportifs.length === 0"
                                >Aucun sportif inscrit</span
                              >
                              <span
                                *ngFor="
                                  let sportif of seance.sportifs;
                                  let last = last
                                "
                              >
                                {{ sportif.prenom }} {{ sportif.nom
                                }}{{ !last ? ', ' : '' }}
                              </span>
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
                              routerLink="/coach/seances/{{ seance.id }}"
                              class="text-purple-600 hover:text-purple-900"
                              >Détails</a
                            >
                            <button
                              *ngIf="seance.statut === 'prévue'"
                              class="ml-3 text-green-600 hover:text-green-900"
                            >
                              Valider
                            </button>
                            <button
                              *ngIf="seance.statut === 'prévue'"
                              class="ml-3 text-red-600 hover:text-red-900"
                            >
                              Annuler
                            </button>
                          </td>
                        </tr>
                        <tr *ngIf="todaySeances.length === 0">
                          <td
                            colspan="6"
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                          >
                            Aucune séance prévue aujourd'hui.
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
                    Créer une séance
                  </h3>
                  <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Planifiez une nouvelle séance d'entraînement pour vos
                      sportifs.
                    </p>
                  </div>
                  <div class="mt-5">
                    <a
                      routerLink="/coach/seances/creer"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Créer
                    </a>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Gérer les exercices
                  </h3>
                  <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Consultez et modifiez votre catalogue d'exercices pour les
                      séances.
                    </p>
                  </div>
                  <div class="mt-5">
                    <a
                      routerLink="/coach/exercices"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Gérer
                    </a>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Voir mes revenus
                  </h3>
                  <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Consultez vos fiches de paie et le détail de vos revenus.
                    </p>
                  </div>
                  <div class="mt-5">
                    <a
                      routerLink="/coach/revenus"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Consulter
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
export class CoachDashboardComponent implements OnInit {
  coach: Coach = {
    id: '1',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@coachapp.com',
    role: 'ROLE_COACH',
    specialites: ['Fitness', 'Cardio'],
    tarifHoraire: 45,
  };

  upcomingSeances: Seance[] = [
    {
      id: '1',
      dateHeure: '2023-04-15T10:00:00',
      typeSeance: 'solo',
      themeSeance: 'fitness',
      coach: this.coach,
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
      coach: this.coach,
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
      themeSeance: 'fitness',
      coach: this.coach,
      sportifs: [],
      exercices: [],
      statut: 'validée',
      niveauSeance: 'intermédiaire',
    },
  ];

  todaySeances: Seance[] = [
    {
      id: '4',
      dateHeure: '2023-04-12T15:00:00',
      typeSeance: 'trio',
      themeSeance: 'cardio',
      coach: this.coach,
      sportifs: [
        {
          id: '1',
          nom: 'Dubois',
          prenom: 'Marie',
          email: 'marie.dubois@example.com',
          role: 'ROLE_SPORTIF',
          dateInscription: '2023-01-15',
          niveauSportif: 'intermédiaire',
        },
        {
          id: '2',
          nom: 'Martin',
          prenom: 'Lucas',
          email: 'lucas.martin@example.com',
          role: 'ROLE_SPORTIF',
          dateInscription: '2023-02-10',
          niveauSportif: 'débutant',
        },
      ],
      exercices: [],
      statut: 'prévue',
      niveauSeance: 'débutant',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  calculateMonthlyRevenue(): number {
    // In a real application, this would calculate based on completed sessions
    // For this example, we'll just return a fixed amount
    return 1250;
  }
}
