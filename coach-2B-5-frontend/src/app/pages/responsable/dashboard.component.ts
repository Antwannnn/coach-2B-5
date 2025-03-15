import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-responsable-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ResponsableDashboardComponent implements OnInit {
  private user = signal<User | null>(null);
  
  // Signaux pour les compteurs (à remplacer par des données réelles)
  public coachCount = signal<number>(12);
  public sportifCount = signal<number>(48);
  public fichesPaieCount = signal<number>(36);
  public seancesCount = signal<number>(124);
  public revenusTotal = signal<number>(8750);
  public satisfactionRate = signal<number>(92);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user.set(this.authService.getUser());
    // Dans une application réelle, vous chargeriez ici les données depuis un service
  }
} 
