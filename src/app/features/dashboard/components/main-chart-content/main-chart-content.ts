import { Component,input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChartSkeleton } from "./chart-skeleton/chart-skeleton";
import { FilterDropdown } from "./filter-dropdown/filter-dropdown";
import { MainChart } from "./main-chart/main-chart";
import { DashboardState } from '../../../../core/types/coin-types';

@Component({
  selector: 'main-chart-content',
  imports: [ CommonModule, NgOptimizedImage, ChartSkeleton, FilterDropdown, MainChart],
  templateUrl: './main-chart-content.html',
  styleUrl: './main-chart-content.css',
})
export class MainChartContent {
  public readonly perDayPrice = input<number[] | null>(null);
  public readonly combinedData = input<DashboardState | null>();
  
  public readonly isChartError = input.required<boolean>();
  public readonly retry = output<void>();
}
