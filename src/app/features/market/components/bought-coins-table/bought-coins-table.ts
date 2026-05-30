import { Component, input, output } from '@angular/core';
import { OwnedCoins } from '../../../../core/types/coin-types';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BenefitIndicatorPipe } from '../../../../shared/pipes/benefit-indicator-pipe';
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { PriceHighlightDirective } from '../../../../shared/directives/ui-directives/price-highlight-directive';
import { DataTableComponent } from "../../../../shared/components/tables/data-table-component/data-table-component";
import { TableColumnDirective } from "../../../../shared/directives/table-directives/table-column.directive";

@Component({
  selector: 'bought-coins-table',
  imports: [
    CommonModule,
    NgOptimizedImage,
    BenefitIndicatorPipe,
    UiButton,
    PriceHighlightDirective,
    DataTableComponent,
    TableColumnDirective
],
  templateUrl: './bought-coins-table.html',
  styleUrl: './bought-coins-table.css',
})
export class BoughtCoinsTable {
  public readonly boughtCoins = input< OwnedCoins[] | null >(null);
  public readonly onSell = output<OwnedCoins>();

  public readonly boughtCoinsTableColumns = [
    { key: 'coin', label: 'Coin' },
    { key: 'buy_price', label: 'Avg. Buy Price' },
    { key: 'current_price', label: 'Current Price' },
    { key: 'amount', label: 'Amount' },
    { key: 'profitLoss', label: 'Profit / Loss' },
    { key: 'actions', label: 'Actions' },
  ];
}
