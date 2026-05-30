import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { OwnedCoins } from '../../../../core/types/coin-types/coin-types';

@Component({
  selector: 'transaction-history',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory {
  public readonly transactionHistory = input<OwnedCoins[] | null>(null);

  public getTransactionTotal(c: OwnedCoins): number {
    const amount = c.status === 'sold'
      ? c.amount * -1
      : c.amount;
  
    return c.buy_price * amount;
  };

  public isSold (c: OwnedCoins): boolean {
    return c.status === 'sold';
  };
  public statusLabel (c: OwnedCoins): string {
    return c.status === 'sold' ? 'Sold' : 'Bought'
  };
}
