import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHighlights } from "../../components/dashboard-highlights/dashboard-highlights";
import { TopPerformersTable } from "../../components/top-performers-table/top-performers-table";
import { MainDashboardService } from '../../services/main-dashboard-service';
import { combineLatest, map, Observable } from 'rxjs';
import { MainChartContent } from "../../components/main-chart-content/main-chart-content";
import { CryptoExchange, DashboardData } from '../../../../core/types/coin-types';
import { TopExchangesTable } from "../../components/top-exchanges-table/top-exchanges-table";
import { LiveStreamService } from '../../../../core/services/dashboard-services/live-stream-service';

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

  private mainDashboardService = inject(MainDashboardService);
  public readonly isChartError = this.mainDashboardService.isChartError;
  private liveStreamService = inject(LiveStreamService)

  public readonly dashboardData$: Observable<DashboardData> = 
  this.mainDashboardService.dashboardData$;

  public readonly topCoins$: Observable<DashboardData> = 
  this.mainDashboardService.dashboardData$;

  public readonly last24hPrices$: Observable<number[] | null> = 
  this.mainDashboardService.last24hPrices$;

  private readonly selectedCoin$ = 
  this.mainDashboardService.selectedCoin$;

  public readonly cs$: any = 
  combineLatest(
    this.topCoins$,
    this.selectedCoin$,
  ).pipe(
    map(([topCoins,selectedCoin]) => {
      return { topCoins,selectedCoin };
    })
  );

  public readonly cryptoExchanges$: Observable<CryptoExchange[]> = 
  this.mainDashboardService.exchangesData$;

  public readonly top100Coin$ = 
  this.liveStreamService.topCoins$;

  public readonly livePrices$ = 
  this.liveStreamService.livePrices$;


  public retry(): void {
    this.mainDashboardService.retry();
  }

}
