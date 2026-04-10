import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject, input, signal } from '@angular/core';
import { MainDashboardService } from '../../../services/main-dashboard-service';
import { Coin } from '../../../../../core/types/coin-types';

@Component({
  selector: 'filter-dropdown',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './filter-dropdown.html',
  styleUrl: './filter-dropdown.css',
})
export class FilterDropdown {
  options = input< Coin[] | null >(null);
  placeholder = input('default');
  maxWidth = input<boolean>(false);

  open = signal(false);
  selected = signal<Coin | null>(null);

  private mainDashboardService = inject(MainDashboardService);

  toggle() {
    if ( !this.options()?.length ) return;
    this.open.update(prev => !prev); 
  }


  select(option: Coin) {
    this.selected.set(option);
    
    this.mainDashboardService.selectedCoin.set(
      option.id
    );

    this.open.set(false);
  }

  @HostListener('document:click')
  close() {
    this.open.set(false)
  }
}
