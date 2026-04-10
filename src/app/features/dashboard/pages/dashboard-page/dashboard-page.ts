import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHighlights } from "../../components/dashboard-highlights/dashboard-highlights";
import { TopPerformersTable } from "../../components/top-performers-table/top-performers-table";
import { MainDashboardService } from '../../services/main-dashboard-service';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { MainChartContent } from "../../components/main-chart-content/main-chart-content";
import { DashboardData, DashboardState } from '../../../../core/types/coin-types';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, TopPerformersTable, DashboardHighlights, MainChartContent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {

  private mainDashboardService = inject(MainDashboardService);

  readonly dashboardData$: Observable<DashboardData> = 
  this.mainDashboardService.dashboardData$;

  readonly topCoins$: Observable<DashboardData> = 
  this.mainDashboardService.dashboardData$;

  readonly perDayPrices$: Observable<number[]> = 
  this.mainDashboardService.perDay$;

  readonly selectedCoin$ = 
  this.mainDashboardService.selectedCoin$;

  readonly cs$: Observable<DashboardState> = 
  combineLatest(
    this.topCoins$,
    this.selectedCoin$,
  ).pipe(
    map(([topCoins,selectedCoin]) => {
      return { topCoins,selectedCoin };
    }),
    tap(console.log)
  )

}
