import { Component, computed, effect, ElementRef, input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { OwnedCoins } from '../../../../core/types/coin-types/coin-types';
import { DonutSkeleton } from "../../../../shared/components/donut-skeleton/donut-skeleton";
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'portfolio-donut-chart',
  imports: [DonutSkeleton, UiButton, RouterLink],
  templateUrl: './portfolio-donut-chart.html',
  styleUrl: './portfolio-donut-chart.css',
})
export class PortfolioDonutChart {

  public readonly avalibleCoins = input<OwnedCoins[] | null>(null);

  constructor() {
    effect(() => {
      const labels = this.chartLabels();
      const data = this.chartData();

      if (!this.chart) return;

      this.chart.data.labels = labels;

      this.chart.data.datasets[0].data = data;

      this.chart.update();
    });
  };

  public readonly isLoading = computed(() => {
    const coins = this.avalibleCoins();
    if ( !coins ) return true;
    return false;
  })

  public readonly chartLabels = computed(() => {
    const coins = this.avalibleCoins();
  
    if (!coins) return [];
  
    const chartLabels = coins.map(c => c.coin_symbol.toUpperCase());
  
    return chartLabels;
  });

  public readonly chartData = computed(() => {
    const coins = this.avalibleCoins();
  
    if (!coins) return [];
  
    const chartData = coins.map(c => {
      const currentTotalValue = c.amount * c.current_price;
      return Number(currentTotalValue.toFixed(2));
    })
    return chartData;
  });

  @ViewChild('donutChartCanvas') donutChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    const myLabels = this.chartLabels();
    const myData = this.chartData(); 

    this.chart = new Chart(this.donutChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: myLabels,
        datasets: [{
          label: 'Value ($)',
          data: myData,
          backgroundColor: [
            '#6366f1', 
            '#f59e0b', 
            '#10b981', 
            '#8b5cf6', 
            '#ec4899' 
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: {
                family: 'system-ui',
                size: 12
              },
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` $${context.raw}`
            }
          }
        }
      }
    });
  }
}
