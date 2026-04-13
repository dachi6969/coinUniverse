import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightSkeleton } from "./highlight-skeleton/highlight-skeleton";
import { DashboardData } from '../../../../core/types/coin-types';
import { PriceHighlightDirective } from "../../../../shared/directives/price-highlight-directive";
import { LivePrices } from '../../../../core/types/live-prices.types';

@Component({
  selector: 'dashboard-highlights',
  imports: [CommonModule, HighlightSkeleton, PriceHighlightDirective],
  templateUrl: './dashboard-highlights.html',
  styleUrl: './dashboard-highlights.css',
})
export class DashboardHighlights {

  readonly data = input< DashboardData | null >(null);
  readonly livePrices = input< LivePrices | null >(null);

}
