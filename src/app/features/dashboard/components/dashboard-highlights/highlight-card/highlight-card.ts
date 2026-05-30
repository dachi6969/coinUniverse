import { Component, input } from '@angular/core';
import { Coin } from '../../../../../core/types/coin-types';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PriceHighlightDirective } from '../../../../../shared/directives/price-highlight-directive';
import { BenefitIndicator } from "../../../../../shared/directives/benefit-indicator";

@Component({
  selector: 'highlight-card',
  imports: [CommonModule, PriceHighlightDirective, BenefitIndicator,NgOptimizedImage],
  templateUrl: './highlight-card.html',
  styleUrl: './highlight-card.css',
})
export class HighlightCard {
  public readonly data = input< Coin | null >(null);
}
