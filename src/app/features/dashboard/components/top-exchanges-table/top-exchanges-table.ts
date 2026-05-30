import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CryptoExchange } from '../../../../core/types/coin-types';
import { DataTableComponent } from "../../../../shared/components/tables/data-table-component/data-table-component";
import { TableColumnDirective } from "../../../../shared/directives/table-directives/table-column.directive";

@Component({
  selector: 'top-exchanges-table',
  imports: [
    CommonModule,
    NgOptimizedImage,
    DataTableComponent,
    TableColumnDirective
],
  templateUrl: './top-exchanges-table.html',
  styleUrl: './top-exchanges-table.css',
})
export class TopExchangesTable {
  public readonly data = input< CryptoExchange[] | null >(null);

  public readonly topExchangesColumns = [
    { key: 'name', label: 'Exchange' },
    { key: 'trust_score', label: 'Trust Score' },
    { key: 'trade_volume_24h_btc', label: '24h Volume (BTC)' },
    { key: 'country_year', label: 'Country / year' },
  ]
}
