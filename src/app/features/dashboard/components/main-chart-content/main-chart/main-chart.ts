import { Component, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'main-chart',
  imports: [BaseChartDirective],
  templateUrl: './main-chart.html',
  styleUrl: './main-chart.css',
})
export class MainChart implements OnChanges {

  readonly data = input<number[] | null>(null);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  ngOnChanges(changes: SimpleChanges): void {
    if( changes['data'] ) {
      const prices = this.data() ?? [0,0,0,0,0,0,0,0];
      if (this.lineChartData.datasets[0]) {
        this.lineChartData.datasets[0].data = prices;
        this.chart?.update();
      }
    }
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [{
      data: [],
      label: 'BTC/USD',
      borderColor: '#22c55e',
      borderWidth: 4,
      pointRadius: 0,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#F7931A',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3,
      fill: true,
      tension: 0.5,
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        
        if (!chartArea) {
          return 'rgba(34, 197, 94, 0.5)'; 
        }

        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.5)');
        gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.1)');
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
        
        return gradient;
      }
    }]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
        titleColor: '#94a3b8',
        bodyColor: '#ffffff',
        titleFont: { size: 13, family: 'Inter, sans-serif' },
        bodyFont: { size: 16, weight: 'bold', family: 'Inter, sans-serif' },
        padding: 16,
        cornerRadius: 12,
        displayColors: false,
        borderColor: 'rgba(247, 147, 26, 0.3)',
        borderWidth: 1,
        caretPadding: 15,
        callbacks: {
          label: (context: any) => `$ ${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 12 } },
        border: { display: false }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { 
          maxTicksLimit: 7,
          color: '#64748b', 
          font: { size: 12 },
          callback: (value) => '$' + value.toLocaleString()
        },
        border: { display: false }
      }
    }
  };
}
