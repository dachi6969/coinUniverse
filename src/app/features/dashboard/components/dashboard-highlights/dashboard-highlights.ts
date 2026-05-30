import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightSkeleton } from "./highlight-skeleton/highlight-skeleton";
import { DashboardData } from '../../../../core/types/coin-types/coin-types';
import { HighlightCard } from "./highlight-card/highlight-card";

@Component({
  selector: 'dashboard-highlights',
  imports: [
    CommonModule, 
    HighlightSkeleton, 
    HighlightCard
  ],
  templateUrl: './dashboard-highlights.html',
  styleUrl: './dashboard-highlights.css',
})
export class DashboardHighlights {
  public readonly hightlightsData = input< DashboardData | null >(null);
}
