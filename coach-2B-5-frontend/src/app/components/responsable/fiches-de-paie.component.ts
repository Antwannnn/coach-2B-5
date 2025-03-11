import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FicheDePaie } from '../../models/fiche-de-paie.model';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-responsable-fiches-de-paie',
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
                    class="text-gray-300 hover:bg-teal-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Coachs</a
                  >
                  <a
                    routerLink="/responsable/fiches-de-paie"
                    class="bg-teal-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
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
          <h1 class="text-3xl font-bold text-gray-900">Fiches de paie</h1>
        </div>
      </header>

      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Filters -->
          <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Filtres
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Filtrer les fiches de paie par période ou par coach
                </p>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="month"
                      class="block text-sm font-medium text-gray-700"
                      >Mois</label
                    >
                    <select
                      id="month"
                      name="month"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    >
                      <option value="1">Janvier</option>
                      <option value="2">Février</option>
                      <option value="3">Mars</option>
                      <option value="4">Avril</option>
                      <option value="5">Mai</option>
                      <option value="6">Juin</option>
                      <option value="7">Juillet</option>
                      <option value="8">Août</option>
                      <option value="9">Septembre</option>
                      <option value="10">Octobre</option>
                      <option value="11">Novembre</option>
                      <option value="12">Décembre</option>
                    </select>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="year"
                      class="block text-sm font-medium text-gray-700"
                      >Année</label
                    >
                    <select
                      id="year"
                      name="year"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    >
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                    </select>
                  </div>

                  <div class="col-span-6">
                    <label
                      for="coach"
                      class="block text-sm font-medium text-gray-700"
                      >Coach</label
                    >
                    <select
                      id="coach"
                      name="coach"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    >
                      <option value="">Tous les coachs</option>
                      <option *ngFor="let coach of coaches" [value]="coach.id">
                        {{ coach.firstName }} {{ coach.lastName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"
                  >
                    Filtrer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Fiches de paie list -->
          <div class="flex flex-col">
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
                          Coach
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Période
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Montant
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
                      <tr *ngFor="let fiche of fichesDePaie">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div
                              class="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold"
                            >
                              {{ getCoachInitials(fiche.coachId) }}
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">
                                {{ getCoachName(fiche.coachId) }}
                              </div>
                              <div class="text-sm text-gray-500">
                                {{ getCoachEmail(fiche.coachId) }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {{ formatPeriod(fiche.month, fiche.year) }}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {{ fiche.amount ? fiche.amount.toFixed(2) : fiche.montantTotal?.toFixed(2) }} €
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ fiche.hoursWorked || fiche.totalHeures || 0 }} heures
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            [ngClass]="{
                              'bg-green-100 text-green-800':
                                fiche.status === 'paid',
                              'bg-yellow-100 text-yellow-800':
                                fiche.status === 'pending',
                              'bg-red-100 text-red-800':
                                fiche.status === 'rejected'
                            }"
                          >
                            {{ getStatusLabel(fiche.status) }}
                          </span>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                          <button
                            type="button"
                            class="text-teal-600 hover:text-teal-900 mr-4"
                          >
                            Voir
                          </button>
                          <button
                            *ngIf="fiche.status === 'pending'"
                            type="button"
                            class="text-green-600 hover:text-green-900 mr-4"
                          >
                            Valider
                          </button>
                          <button
                            *ngIf="fiche.status === 'pending'"
                            type="button"
                            class="text-red-600 hover:text-red-900"
                          >
                            Rejeter
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Generate button -->
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
              Générer les fiches de paie du mois
            </button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [],
})
export class ResponsableFichesDePaieComponent implements OnInit {
  coaches: Coach[] = [
    {
      id: '1',
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@coachapp.com',
      role: 'ROLE_COACH',
      specialites: ['Musculation'],
      tarifHoraire: 45,
      description: 'Coach spécialisé en musculation et remise en forme',
      createdAt: '2023-01-15',
      sportifs: [],
      // Propriétés pour la compatibilité
      firstName: 'Jean',
      lastName: 'Dupont',
      speciality: 'Musculation',
    },
    {
      id: '2',
      nom: 'Laurent',
      prenom: 'Marie',
      email: 'marie.laurent@coachapp.com',
      role: 'ROLE_COACH',
      specialites: ['Yoga'],
      tarifHoraire: 40,
      description: 'Coach de yoga et méditation',
      createdAt: '2023-02-20',
      sportifs: [],
      // Propriétés pour la compatibilité
      firstName: 'Marie',
      lastName: 'Laurent',
      speciality: 'Yoga',
    },
    {
      id: '3',
      nom: 'Martin',
      prenom: 'Thomas',
      email: 'thomas.martin@coachapp.com',
      role: 'ROLE_COACH',
      specialites: ['Cardio'],
      tarifHoraire: 42,
      description: 'Spécialiste en entraînement cardio-vasculaire',
      createdAt: '2023-03-10',
      sportifs: [],
      // Propriétés pour la compatibilité
      firstName: 'Thomas',
      lastName: 'Martin',
      speciality: 'Cardio',
    },
  ];

  fichesDePaie: FicheDePaie[] = [
    {
      id: '1',
      coachId: '1',
      month: '3',
      year: '2023',
      amount: 1350,
      hoursWorked: 30,
      status: 'paid',
      createdAt: '2023-03-31',
      // Propriétés pour la compatibilité avec le nouveau modèle
      coach: this.coaches[0],
      periode: '03/2023',
      totalHeures: 30,
      montantTotal: 1350
    },
    {
      id: '2',
      coachId: '2',
      month: '3',
      year: '2023',
      amount: 1200,
      hoursWorked: 30,
      status: 'paid',
      createdAt: '2023-03-31',
      // Propriétés pour la compatibilité avec le nouveau modèle
      coach: this.coaches[1],
      periode: '03/2023',
      totalHeures: 30,
      montantTotal: 1200
    },
    {
      id: '3',
      coachId: '3',
      month: '3',
      year: '2023',
      amount: 1260,
      hoursWorked: 30,
      status: 'paid',
      createdAt: '2023-03-31',
      // Propriétés pour la compatibilité avec le nouveau modèle
      coach: this.coaches[2],
      periode: '03/2023',
      totalHeures: 30,
      montantTotal: 1260
    },
    {
      id: '4',
      coachId: '1',
      month: '4',
      year: '2023',
      amount: 1350,
      hoursWorked: 30,
      status: 'pending',
      createdAt: '2023-04-30',
      // Propriétés pour la compatibilité avec le nouveau modèle
      coach: this.coaches[0],
      periode: '04/2023',
      totalHeures: 30,
      montantTotal: 1350
    },
    {
      id: '5',
      coachId: '2',
      month: '4',
      year: '2023',
      amount: 1200,
      hoursWorked: 30,
      status: 'pending',
      createdAt: '2023-04-30',
      // Propriétés pour la compatibilité avec le nouveau modèle
      coach: this.coaches[1],
      periode: '04/2023',
      totalHeures: 30,
      montantTotal: 1200
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getCoachName(coachId: string | number | undefined): string {
    if (coachId === undefined) return 'Coach inconnu';
    const coach = this.coaches.find((c) => c.id == coachId);
    return coach ? `${coach.firstName || coach.prenom} ${coach.lastName || coach.nom}` : 'Coach inconnu';
  }

  getCoachEmail(coachId: string | number | undefined): string {
    if (coachId === undefined) return '';
    const coach = this.coaches.find((c) => c.id == coachId);
    return coach ? coach.email : '';
  }

  getCoachInitials(coachId: string | number | undefined): string {
    if (coachId === undefined) return '??';
    const coach = this.coaches.find((c) => c.id == coachId);
    if (!coach) return '??';
    
    const firstInitial = (coach.firstName || coach.prenom || '').charAt(0);
    const lastInitial = (coach.lastName || coach.nom || '').charAt(0);
    return `${firstInitial}${lastInitial}`;
  }

  formatPeriod(month: string | number | undefined, year: string | number | undefined): string {
    if (month === undefined || year === undefined) return 'Période inconnue';
    
    // Convertir en nombres si nécessaire
    const monthNum = typeof month === 'string' ? parseInt(month, 10) : month;
    const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;
    
    const date = new Date(yearNum, monthNum - 1);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  getStatusLabel(status: string | undefined): string {
    if (!status) return 'Statut inconnu';
    
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'rejected':
        return 'Rejetée';
      default:
        return status;
    }
  }
}
