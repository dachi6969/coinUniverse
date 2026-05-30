import { Component, input } from '@angular/core';
import { DataTableComponent } from "../../../../shared/components/tables/data-table-component/data-table-component";
import { OwnedCoins } from '../../../../core/types/coin-types/coin-types';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PriceHighlightDirective } from '../../../../shared/directives/ui-directives/price-highlight-directive';
import { BenefitIndicatorPipe } from '../../../../shared/pipes/benefit-indicator-pipe';
import { TableColumnDirective } from "../../../../shared/directives/table-directives/table-column.directive";

@Component({
  selector: 'avalible-assets',
  imports: [
    DataTableComponent,
    CommonModule,
    PriceHighlightDirective,
    BenefitIndicatorPipe,
    NgOptimizedImage,
    TableColumnDirective
],
  templateUrl: './avalible-assets.html',
  styleUrl: './avalible-assets.css',
})
export class AvalibleAssets {
  public readonly ownCoins = input<OwnedCoins[] | null>(null);

  public readonly ownCoinsTableColumns = [
    { key: 'coin', label: 'Coin' },
    { key: 'buy_price', label: 'Avg. Buy Price' },
    { key: 'current_price', label: 'Current Price' },
    { key: 'amount', label: 'Amount' },
    { key: 'profitLoss', label: 'Profit / Loss' },
  ];

}
