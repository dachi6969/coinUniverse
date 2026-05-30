import { Component, input } from '@angular/core';
import { Coin } from '../../../../../core/types/coin-types/coin-types';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PriceHighlightDirective } from '../../../../../shared/directives/ui-directives/price-highlight-directive';
import { BenefitIndicatorDirective } from "../../../../../shared/directives/ui-directives/benefit-indicator-directive";

@Component({
  selector: 'highlight-card',
  imports: [CommonModule, PriceHighlightDirective, BenefitIndicatorDirective,NgOptimizedImage],
  templateUrl: './highlight-card.html',
  styleUrl: './highlight-card.css',
})
export class HighlightCard {
  public readonly data = input< Coin | null >(null);
}
