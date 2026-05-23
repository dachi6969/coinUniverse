import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AbbreviateNumberPipe } from '../../../../shared/pipes/abbreviate-number/abbreviate-number-pipe';
import { Coin } from '../../../../core/types/coin-types';
import { PriceHighlightDirective } from '../../../../shared/directives/price-highlight-directive';
import { BenefitIndicator } from '../../../../shared/directives/benefit-indicator';
import { DataTableComponent } from "../../../../shared/components/tables/data-table-component/data-table-component";
import { TableColumnDirective } from "../../../../shared/directives/table-column.directive";

@Component({
  selector: 'top-performers-table',
  imports: [
    CommonModule,
    NgOptimizedImage,
    AbbreviateNumberPipe,
    PriceHighlightDirective,
    BenefitIndicator,
    DataTableComponent,
    TableColumnDirective
],
  templateUrl: './top-performers-table.html',
  styleUrl: './top-performers-table.css',
})
export class TopPerformersTable {
  public readonly data = input< Coin[] | null >(null);

  public readonly topPerformanceColumns = [
    { key: 'asset', label: 'Asset' },
    { key: 'current_price', label: 'Price' },
    { key: 'price_change_percentage_24h', label: '24h Change' },
    { key: 'market_cap', label: 'Market Cap' },
  ];

}
