import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { MainDashboardService } from '../../../services/main-dashboard-service';
import { Coin } from '../../../../../core/types/coin-types';

@Component({
  selector: 'filter-dropdown',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './filter-dropdown.html',
  styleUrl: './filter-dropdown.css',
})
export class FilterDropdown implements OnInit {
  public options = input< Coin[] | null >(null);
  public readonly placeholder = input('default');
  public maxWidth = input<boolean>(false);

  public open = signal(false);
  public selected = signal<Coin | null>(null);

  private mainDashboardService = inject(MainDashboardService);

  ngOnInit(): void {
    this.selected.set(this.mainDashboardService.selectedCoin());
  }

  public toggle() {
    if ( !this.options()?.length ) return;
    this.open.update(prev => !prev); 
  }


  public select(option: Coin) {
    this.selected.set(option);
    
    this.mainDashboardService.selectedCoin.set(
      option
    );

    this.open.set(false);
  }

  @HostListener('document:click')
  close() {
    this.open.set(false)
  }
}
