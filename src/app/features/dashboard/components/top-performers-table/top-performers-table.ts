import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AbbreviateNumberPipe } from '../../../../shared/pipes/abbreviate-number/abbreviate-number-pipe';
import { Coin } from '../../../../core/types/coin-types/coin-types';
import { PriceHighlightDirective } from '../../../../shared/directives/ui-directives/price-highlight-directive';
import { BenefitIndicatorDirective } from '../../../../shared/directives/ui-directives/benefit-indicator-directive';
import { DataTableComponent } from "../../../../shared/components/tables/data-table-component/data-table-component";
import { TableColumnDirective } from "../../../../shared/directives/table-directives/table-column.directive";

@Component({
  selector: 'top-performers-table',
  imports: [
    CommonModule,
    NgOptimizedImage,
    AbbreviateNumberPipe,
    PriceHighlightDirective,
    BenefitIndicatorDirective,
    DataTableComponent,
    TableColumnDirective
],
  templateUrl: './top-performers-table.html',
  styleUrl: './top-performers-table.css',
})
export class TopPerformersTable {
  public readonly top100Coins = input< Coin[] | null >(null);

  public readonly topPerformanceColumns = [
    { key: 'asset', label: 'Asset' },
    { key: 'current_price', label: 'Price' },
    { key: 'price_change_percentage_24h', label: '24h Change' },
    { key: 'market_cap', label: 'Market Cap' },
  ];

}
