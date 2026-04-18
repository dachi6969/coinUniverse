import { Component, inject } from '@angular/core';
import { MainDashboardService } from '../../../services/main-dashboard-service';

@Component({
  selector: 'chart-skeleton',
  imports: [],
  templateUrl: './chart-skeleton.html',
  styleUrl: './chart-skeleton.css',
})
export class ChartSkeleton {

  private mainDashboardService = inject(MainDashboardService);

  retry(): void {
    this.mainDashboardService.retry();
  }

}
