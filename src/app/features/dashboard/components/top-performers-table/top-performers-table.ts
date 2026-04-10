import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AbbreviateNumberPipe } from '../../../../shared/pipes/abbreviate-number/abbreviate-number-pipe';
import { TableSkeleton } from "./table-skeleton/table-skeleton";
import { DashboardData } from '../../../../core/types/coin-types';

@Component({
  selector: 'top-performers-table',
  imports: [CommonModule, NgOptimizedImage, AbbreviateNumberPipe, TableSkeleton],
  templateUrl: './top-performers-table.html',
  styleUrl: './top-performers-table.css',
})
export class TopPerformersTable {

  readonly data = 
  input< Pick<DashboardData,'topValues'> | null >(null);

}
