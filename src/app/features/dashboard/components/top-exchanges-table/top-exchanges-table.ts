import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CryptoExchange } from '../../../../core/types/coin-types';
import { TableSkeleton } from "../top-performers-table/table-skeleton/table-skeleton";

@Component({
  selector: 'top-exchanges-table',
  imports: [CommonModule, NgOptimizedImage, TableSkeleton],
  templateUrl: './top-exchanges-table.html',
  styleUrl: './top-exchanges-table.css',
})
export class TopExchangesTable {

  readonly data = input< CryptoExchange[] | null >(null);


}
