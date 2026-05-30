import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, input, output, signal } from '@angular/core';
import { Coin } from '../../../../../core/types/coin-types';

@Component({
  selector: 'filter-dropdown',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './filter-dropdown.html',
  styleUrl: './filter-dropdown.css',
})
export class FilterDropdown  {
  public readonly placeholder = input('default');
  public readonly selected = input< Coin | null >();
  public readonly options = input< Coin[] | null >(null);
  public readonly select = output<Coin>();

  public isOpen = signal<boolean>(false);

  @HostListener('document:click')
  close() {
    this.isOpen.set(false)
  }

  // METHODS.
  public onToggle() {
    if ( !this.options()?.length ) return;
    this.isOpen.update(prev => !prev); 
  }

  public onSelect(option: Coin) {
    this.select.emit(option)
    this.isOpen.set(false);
  }
}
