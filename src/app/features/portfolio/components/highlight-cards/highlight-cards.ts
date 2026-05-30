import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { PriceHighlightDirective } from '../../../../shared/directives/ui-directives/price-highlight-directive';
import { HighlightSkeleton } from "../../../dashboard/components/dashboard-highlights/highlight-skeleton/highlight-skeleton";
import { HighlightCard } from "./highlight-card/highlight-card";
import { PortfolioHighlightsType } from './highlights-types';

@Component({
  selector: 'highlight-cards',
  imports: [
    CommonModule, 
    PriceHighlightDirective, 
    NgOptimizedImage, 
    HighlightSkeleton, 
    HighlightCard
  ],
  templateUrl: './highlight-cards.html',
  styleUrl: './highlight-cards.css',
})
export class HighlightCards {
  public readonly balance = input<number>(0);
  public readonly highlightsData = input< PortfolioHighlightsType | null>(null);

  public readonly profit = computed(() => {
    const data = this.highlightsData();
    if ( !data ) return null;
    return data.profit ?? 0.00;
  });
  public readonly coinsQuaintity = computed(() => {
    const data = this.highlightsData();
    if ( !data ) return null;
    return data.avalibleCoinsQuaintity ?? 0;
  });
  public readonly topPerformer = computed(() => {
    const data = this.highlightsData();
    if ( !data ) return null;
    return data.topPerformer;
  });
  

}
