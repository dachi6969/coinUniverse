import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AbbreviateNumberPipe } from '../../../../shared/pipes/abbreviate-number/abbreviate-number-pipe';
import { TableSkeleton } from "./table-skeleton/table-skeleton";
import { Coin } from '../../../../core/types/coin-types';
import { PriceHighlightDirective } from '../../../../shared/directives/price-highlight-directive';
import { LivePrices } from '../../../../core/types/live-prices.types';
import { BenefitIndicator } from '../../../../shared/directives/benefit-indicator';

@Component({
  selector: 'top-performers-table',
  imports: [CommonModule, NgOptimizedImage, AbbreviateNumberPipe, TableSkeleton, PriceHighlightDirective, BenefitIndicator],
  templateUrl: './top-performers-table.html',
  styleUrl: './top-performers-table.css',
})
export class TopPerformersTable {

  readonly data = 
  input< Coin[] | null >(null);

  readonly livePrices = 
  input< LivePrices | null >(null);

}
