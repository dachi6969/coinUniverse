import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHighlights } from "../../components/dashboard-highlights/dashboard-highlights";
import { TopPerformersTable } from "../../components/top-performers-table/top-performers-table";
import { MainDashboardService } from '../../services/main-dashboard-service';
import { MainChartContent } from "../../components/main-chart-content/main-chart-content";
import { TopExchangesTable } from "../../components/top-exchanges-table/top-exchanges-table";
import { Coin } from '../../../../core/types/coin-types/coin-types';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    CommonModule, 
    TopPerformersTable, 
    DashboardHighlights, 
    MainChartContent, 
    TopExchangesTable
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private readonly mainDashboardService = inject(MainDashboardService);

  // UI State.
  public readonly isChartError = this.mainDashboardService.isChartError;

  // Data Streams.
  public readonly last24hPrices$ = this.mainDashboardService.last24hPrices$;
  public readonly dashboardData$ = this.mainDashboardService.dashboardData$
  public readonly cryptoExchanges$ = this.mainDashboardService.exchangesData$;
  public readonly top100LiveCoins$ = this.mainDashboardService.top100LiveCoins$;
  public readonly top100staticCoins$ = this.mainDashboardService.topCoins$;
  public readonly selectedCoin$ = this.mainDashboardService.selectedCoin$;

  // METHODS.
  public onSelect(coin: Coin): void {
    this.mainDashboardService.onSelect(coin);
  };

  public onRetry(): void {
    this.mainDashboardService.onRetry();
  };

}
