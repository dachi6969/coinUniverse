import { Component, input, output } from '@angular/core';

@Component({
  selector: 'chart-skeleton',
  imports: [],
  templateUrl: './chart-skeleton.html',
  styleUrl: './chart-skeleton.css',
})
export class ChartSkeleton {
  public readonly isChartError = input.required<boolean>();
  public readonly retry = output<void>();
}
