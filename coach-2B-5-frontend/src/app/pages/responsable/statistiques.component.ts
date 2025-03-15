import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SeanceService } from '../../services/seance.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-responsable-statistiques',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class ResponsableStatistiquesComponent implements OnInit {
  months: string[] = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  topCoachs = [
    { name: 'Thomas Dubois', initials: 'TD', revenue: 2450, percentage: 100 },
    { name: 'Sophie Martin', initials: 'SM', revenue: 1980, percentage: 80 },
    { name: 'Lucas Petit', initials: 'LP', revenue: 1650, percentage: 67 },
    { name: 'Emma Leroy', initials: 'EL', revenue: 1320, percentage: 54 },
  ];
  
  popularSpecialities = [
    { name: 'Musculation', icon: '💪', bgColor: 'bg-red-500', barColor: 'bg-red-500', sessions: 48, percentage: 100 },
    { name: 'Cardio', icon: '🏃', bgColor: 'bg-blue-500', barColor: 'bg-blue-500', sessions: 36, percentage: 75 },
    { name: 'Yoga', icon: '🧘', bgColor: 'bg-green-500', barColor: 'bg-green-500', sessions: 28, percentage: 58 },
    { name: 'Pilates', icon: '🤸', bgColor: 'bg-purple-500', barColor: 'bg-purple-500', sessions: 22, percentage: 46 },
  ];

  constructor() {}

  ngOnInit(): void {}
  
  getRandomHeight(index: number): number {
    // Simuler des données de graphique avec une tendance à la hausse
    const baseHeights = [30, 45, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90];
    return baseHeights[index];
  }
} 
