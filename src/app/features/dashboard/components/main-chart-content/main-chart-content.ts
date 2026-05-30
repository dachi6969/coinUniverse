import { Component,input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChartSkeleton } from "./chart-skeleton/chart-skeleton";
import { FilterDropdown } from "./filter-dropdown/filter-dropdown";
import { MainChart } from "./main-chart/main-chart";
import { Coin } from '../../../../core/types/coin-types/coin-types';

@Component({
  selector: 'main-chart-content',
  imports: [ 
    CommonModule,
    NgOptimizedImage,
    ChartSkeleton, 
    FilterDropdown, 
    MainChart
  ],
  templateUrl: './main-chart-content.html',
  styleUrl: './main-chart-content.css',
})
export class MainChartContent {
  public readonly perDayPrice = input<number[] | null>(null);
  public readonly top100coins = input< Coin[] | null >(null);
  public readonly selectedCoin = input< Coin | null >(null);
  public readonly isChartError = input.required<boolean>();

  public readonly select = output<Coin>();
  public readonly retry = output<void>();

  public onSelect(c: Coin): void {
    this.select.emit(c);
  }
}
