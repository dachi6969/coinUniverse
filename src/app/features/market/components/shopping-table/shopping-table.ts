import { Component, input, output } from '@angular/core';
import { Coin } from '../../../../core/types/coin-types';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PriceHighlightDirective } from '../../../../shared/directives/price-highlight-directive';
import { BenefitIndicator } from '../../../../shared/directives/benefit-indicator';
import { AbbreviateNumberPipe } from '../../../../shared/pipes/abbreviate-number/abbreviate-number-pipe';
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { DataTableComponent } from "../../../../shared/components/tables/data-table-component/data-table-component";
import { TableColumnDirective } from '../../../../shared/directives/table-column.directive';

@Component({
  selector: 'shopping-table',
  imports: [
    CommonModule,
    NgOptimizedImage,
    PriceHighlightDirective,
    BenefitIndicator,
    AbbreviateNumberPipe,
    UiButton,
    DataTableComponent,
    TableColumnDirective,
],
  templateUrl: './shopping-table.html',
  styleUrl: './shopping-table.css',
})
export class ShoppingTable {
  public readonly topCoins = input< Coin[] | null >(null);
  public readonly balance = input< number >(0);
  public readonly onBuy = output<Coin>();

  public readonly shopTableColumns = [
    { key: 'symbol', label: 'Coin' },
    { key: 'current_price', label: 'Price' },
    { key: 'price_change_percentage_24h', label: '24h Change' },
    { key: 'market_cap', label: 'Market Cap' },
    { key: 'actions', label: 'Actions' },
  ];
}
