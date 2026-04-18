import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHighlights } from "../../components/dashboard-highlights/dashboard-highlights";
import { TopPerformersTable } from "../../components/top-performers-table/top-performers-table";
import { MainDashboardService } from '../../services/main-dashboard-service';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { MainChartContent } from "../../components/main-chart-content/main-chart-content";
import { CryptoExchange, DashboardData } from '../../../../core/types/coin-types';
import { TopExchangesTable } from "../../components/top-exchanges-table/top-exchanges-table";
import { LiveStreamService } from '../../../../core/services/dashboard-services/live-stream-service';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, TopPerformersTable, DashboardHighlights, MainChartContent, TopExchangesTable],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {

  private mainDashboardService = inject(MainDashboardService);
  private liveStreamService = inject(LiveStreamService)

  readonly dashboardData$: Observable<DashboardData> = 
  this.mainDashboardService.dashboardData$;

  readonly topCoins$: Observable<DashboardData> = 
  this.mainDashboardService.dashboardData$;

  readonly perDayPrices$: Observable<number[] | null> = 
  this.mainDashboardService.perDay$;

  readonly selectedCoin$ = 
  this.mainDashboardService.selectedCoin$;

  readonly cs$: any = 
  combineLatest(
    this.topCoins$,
    this.selectedCoin$,
  ).pipe(
    map(([topCoins,selectedCoin]) => {
      return { topCoins,selectedCoin };
    })
  );

  readonly cryptoExchanges$: Observable<CryptoExchange[]> = 
  this.mainDashboardService.exchangesData$;

  readonly top100Coin$ = 
  this.liveStreamService.topCoins$;

  readonly livePrices$ = 
  this.liveStreamService.livePrices$;

}
