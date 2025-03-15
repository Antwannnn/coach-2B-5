import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Sportif } from '../../models/sportif.model';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsable-sportifs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sportifs.component.html',
  styleUrls: ['./sportifs.component.css']
})
export class ResponsableSportifsComponent implements OnInit {
  searchTerm: string = '';
  filterStatus: string = 'all';
  isLoading: boolean = false;
  
  // Données des sportifs
  sportifs: Sportif[] = [];
  
  public filteredSportifs = signal<Sportif[]>([]);

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSportifs();
  }
  
  loadSportifs(): void {
    this.isLoading = true;
    
    this.userService.getAllSportifs()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (sportifs: Sportif[]) => {
          this.sportifs = sportifs.map((sportif: Sportif) => ({
            ...sportif,
            // Ajouter une propriété actif si elle n'existe pas
            actif: sportif.actif !== undefined ? sportif.actif : true,
            // Formater la date d'inscription si nécessaire
            dateInscription: sportif.dateInscription || 
              (sportif.createdAt ? new Date(sportif.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'),
            // Ajouter un nombre de séances par défaut si non disponible
            nombreSeances: sportif.nombreSeances || 0
          }));
          this.updateFilteredSportifs();
        },
        error: (error: any) => {
          console.error('Erreur lors du chargement des sportifs', error);
          // Fallback aux données mockées en cas d'erreur
          this.loadMockSportifs();
        }
      });
  }
  
  loadMockSportifs(): void {
    // Garder les données mockées existantes pour le fallback
    this.sportifs = [
      {
        id: '1',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        dateInscription: '15/01/2023',
        niveauSportif: 'débutant',
        nombreSeances: 8,
        actif: true,
        role: 'ROLE_SPORTIF'
      },
      {
        id: '2',
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@example.com',
        dateInscription: '03/03/2023',
        niveauSportif: 'intermédiaire',
        nombreSeances: 24,
        actif: true,
        role: 'ROLE_SPORTIF'
      },
      {
        id: '3',
        nom: 'Petit',
        prenom: 'Thomas',
        email: 'thomas.petit@example.com',
        dateInscription: '22/05/2023',
        niveauSportif: 'avancé',
        nombreSeances: 42,
        actif: true,
        role: 'ROLE_SPORTIF'
      },
      {
        id: '4',
        nom: 'Dubois',
        prenom: 'Marie',
        email: 'marie.dubois@example.com',
        dateInscription: '10/07/2023',
        niveauSportif: 'débutant',
        nombreSeances: 5,
        actif: false,
        role: 'ROLE_SPORTIF'
      },
      {
        id: '5',
        nom: 'Leroy',
        prenom: 'Lucas',
        email: 'lucas.leroy@example.com',
        dateInscription: '18/09/2023',
        niveauSportif: 'intermédiaire',
        nombreSeances: 15,
        actif: true,
        role: 'ROLE_SPORTIF'
      }
    ];
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
    // Rediriger vers la page de détail du sportif
    this.router.navigate(['/responsable/sportifs', sportif.id]);
  }
  
  toggleStatus(sportif: Sportif): void {
    const newStatus = !sportif.actif;
    
    // Mettre à jour le statut localement pour une réponse immédiate de l'UI
    sportif.actif = newStatus;
    this.updateFilteredSportifs();
    
    // Envoyer la mise à jour au serveur
    this.userService.updateSportifProfile(sportif.id.toString(), { actif: newStatus })
      .subscribe({
        next: (updatedSportif: Sportif) => {
          console.log(`Statut du sportif ${sportif.prenom} ${sportif.nom} modifié:`, newStatus ? 'Actif' : 'Inactif');
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour du statut du sportif', error);
          // Revenir à l'état précédent en cas d'erreur
          sportif.actif = !newStatus;
          this.updateFilteredSportifs();
        }
      });
  }
} 
