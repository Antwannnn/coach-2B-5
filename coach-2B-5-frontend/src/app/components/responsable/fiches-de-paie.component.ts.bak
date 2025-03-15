import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheDePaie } from '../../models/fiche-de-paie.model';
import { Coach } from '../../models/coach.model';
import { UserService } from '../../services/user.service';
import { FicheDePaieService } from '../../services/fiche-de-paie.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-responsable-fiches-de-paie',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Gestion des Fiches de Paie</h1>
        
        <!-- Contenu principal -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
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
                            {{ fiche.amount ? fiche.amount.toFixed(2) : fiche.montantTotal.toFixed(2) }} €
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
      </div>
    </div>
  `,
  styles: [],
})
export class ResponsableFichesDePaieComponent implements OnInit {
  coaches: Coach[] = [];
  fichesDePaie: FicheDePaie[] = [];
  isLoading = true;
  
  // Filtres
  selectedMonth: string = (new Date().getMonth() + 1).toString(); // Mois courant
  selectedYear: string = new Date().getFullYear().toString(); // Année courante
  selectedCoachId: string = '';
  
  constructor(
    private userService: UserService,
    private ficheDePaieService: FicheDePaieService
  ) {}
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.isLoading = true;
    
    forkJoin({
      coaches: this.userService.getAllCoachs(),
      fichesDePaie: this.ficheDePaieService.getAllFichesDePaie()
    })
    .pipe(finalize(() => {
      this.isLoading = false;
    }))
    .subscribe({
      next: (results) => {
        this.coaches = results.coaches;
        this.fichesDePaie = results.fichesDePaie;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données', error);
        // Fallback aux données mockées en cas d'erreur
        this.loadMockData();
      }
    });
  }
  
  applyFilters(): void {
    // Filtrer les fiches de paie selon les critères sélectionnés
    let filtered = [...this.fichesDePaie];
    
    if (this.selectedMonth) {
      filtered = filtered.filter(fiche => 
        (fiche.month && fiche.month.toString() === this.selectedMonth) || 
        (fiche.periode && fiche.periode.split('/')[0] === this.selectedMonth)
      );
    }
    
    if (this.selectedYear) {
      filtered = filtered.filter(fiche => 
        (fiche.year && fiche.year.toString() === this.selectedYear) || 
        (fiche.periode && fiche.periode.split('/')[1] === this.selectedYear)
      );
    }
    
    if (this.selectedCoachId) {
      filtered = filtered.filter(fiche => 
        (fiche.coachId && fiche.coachId.toString() === this.selectedCoachId) || 
        (fiche.coach && fiche.coach.id.toString() === this.selectedCoachId)
      );
    }
    
    this.fichesDePaie = filtered;
  }
  
  loadMockData(): void {
    // Garder les données mockées existantes
    this.coaches = [
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
    
    this.fichesDePaie = [
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
  }

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

  validateFicheDePaie(fiche: FicheDePaie): void {
    this.ficheDePaieService.updateFicheDePaie(fiche.id.toString(), { status: 'paid' })
      .subscribe({
        next: (updatedFiche) => {
          // Mettre à jour la fiche localement
          const index = this.fichesDePaie.findIndex(f => f.id === fiche.id);
          if (index !== -1) {
            this.fichesDePaie[index] = { ...this.fichesDePaie[index], status: 'paid' };
          }
        },
        error: (error) => {
          console.error('Erreur lors de la validation de la fiche de paie', error);
        }
      });
  }
  
  rejectFicheDePaie(fiche: FicheDePaie): void {
    this.ficheDePaieService.updateFicheDePaie(fiche.id.toString(), { status: 'rejected' })
      .subscribe({
        next: (updatedFiche) => {
          // Mettre à jour la fiche localement
          const index = this.fichesDePaie.findIndex(f => f.id === fiche.id);
          if (index !== -1) {
            this.fichesDePaie[index] = { ...this.fichesDePaie[index], status: 'rejected' };
          }
        },
        error: (error) => {
          console.error('Erreur lors du rejet de la fiche de paie', error);
        }
      });
  }
  
  generateFichesDePaie(): void {
    // Utiliser directement les valeurs string
    const month = this.selectedMonth;
    const year = this.selectedYear;
    
    this.ficheDePaieService.generateFichesDePaie(month, year)
      .subscribe({
        next: (fichesDePaie: FicheDePaie[]) => {
          // Ajouter les nouvelles fiches à la liste
          this.fichesDePaie = [...this.fichesDePaie, ...fichesDePaie];
          this.applyFilters();
        },
        error: (error: any) => {
          console.error('Erreur lors de la génération des fiches de paie', error);
        }
      });
  }
}
