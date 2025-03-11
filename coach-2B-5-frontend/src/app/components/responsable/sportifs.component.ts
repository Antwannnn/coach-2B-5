import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Sportif {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  dateInscription: string;
  niveauSportif: string;
  nombreSeances: number;
  actif: boolean;
}

@Component({
  selector: 'app-responsable-sportifs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Gestion des Sportifs</h1>
        <div class="flex space-x-2">
          <div class="relative">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              placeholder="Rechercher un sportif..." 
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            >
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select 
            [(ngModel)]="filterStatus" 
            class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sportif
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Séances
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let sportif of filteredSportifs()" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span class="text-indigo-700 font-medium">{{ sportif.prenom.charAt(0) }}{{ sportif.nom.charAt(0) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ sportif.prenom }} {{ sportif.nom }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ sportif.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ sportif.dateInscription }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    [ngClass]="{
                      'bg-green-100 text-green-800': sportif.niveauSportif === 'avancé',
                      'bg-yellow-100 text-yellow-800': sportif.niveauSportif === 'intermédiaire',
                      'bg-blue-100 text-blue-800': sportif.niveauSportif === 'débutant'
                    }"
                  >
                    {{ sportif.niveauSportif }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ sportif.nombreSeances }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    [ngClass]="{'bg-green-100 text-green-800': sportif.actif, 'bg-red-100 text-red-800': !sportif.actif}"
                  >
                    {{ sportif.actif ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    class="text-indigo-600 hover:text-indigo-900 mr-3"
                    (click)="viewSportif(sportif)"
                  >
                    Voir
                  </button>
                  <button 
                    class="text-red-600 hover:text-red-900"
                    (click)="toggleStatus(sportif)"
                  >
                    {{ sportif.actif ? 'Désactiver' : 'Activer' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-700">
              Affichage de <span class="font-medium">{{ filteredSportifs().length }}</span> sportifs sur <span class="font-medium">{{ sportifs.length }}</span>
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Précédent</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResponsableSportifsComponent implements OnInit {
  searchTerm: string = '';
  filterStatus: string = 'all';
  
  // Données fictives pour la démonstration
  sportifs: Sportif[] = [
    {
      id: '1',
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      dateInscription: '15/01/2023',
      niveauSportif: 'débutant',
      nombreSeances: 8,
      actif: true
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      dateInscription: '03/03/2023',
      niveauSportif: 'intermédiaire',
      nombreSeances: 24,
      actif: true
    },
    {
      id: '3',
      nom: 'Petit',
      prenom: 'Thomas',
      email: 'thomas.petit@example.com',
      dateInscription: '22/05/2023',
      niveauSportif: 'avancé',
      nombreSeances: 42,
      actif: true
    },
    {
      id: '4',
      nom: 'Dubois',
      prenom: 'Marie',
      email: 'marie.dubois@example.com',
      dateInscription: '10/07/2023',
      niveauSportif: 'débutant',
      nombreSeances: 5,
      actif: false
    },
    {
      id: '5',
      nom: 'Leroy',
      prenom: 'Lucas',
      email: 'lucas.leroy@example.com',
      dateInscription: '18/09/2023',
      niveauSportif: 'intermédiaire',
      nombreSeances: 15,
      actif: true
    }
  ];
  
  public filteredSportifs = signal<Sportif[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.updateFilteredSportifs();
  }
  
  updateFilteredSportifs(): void {
    let filtered = [...this.sportifs];
    
    // Filtrer par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(sportif => 
        sportif.nom.toLowerCase().includes(term) || 
        sportif.prenom.toLowerCase().includes(term) || 
        sportif.email.toLowerCase().includes(term)
      );
    }
    
    // Filtrer par statut
    if (this.filterStatus !== 'all') {
      const isActive = this.filterStatus === 'active';
      filtered = filtered.filter(sportif => sportif.actif === isActive);
    }
    
    this.filteredSportifs.set(filtered);
  }
  
  viewSportif(sportif: Sportif): void {
    console.log('Voir le sportif:', sportif);
    // Dans une application réelle, vous redirigeriez vers la page de détail du sportif
  }
  
  toggleStatus(sportif: Sportif): void {
    sportif.actif = !sportif.actif;
    console.log(`Statut du sportif ${sportif.prenom} ${sportif.nom} modifié:`, sportif.actif ? 'Actif' : 'Inactif');
    // Dans une application réelle, vous enverriez cette mise à jour à un service
  }
} 