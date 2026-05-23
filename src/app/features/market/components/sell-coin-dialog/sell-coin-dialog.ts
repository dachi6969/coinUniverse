import { Component, computed, input, output, signal } from '@angular/core';
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { BuyCoinPayload, OwnedCoins } from '../../../../core/types/coin-types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CryptoInputDirective } from '../../../../shared/directives/crypto-input-directive';

@Component({
  selector: 'sell-coin-dialog',
  imports: [
    UiButton, 
    FormsModule, 
    CommonModule,
    CryptoInputDirective
  ],
  templateUrl: './sell-coin-dialog.html',
  styleUrl: './sell-coin-dialog.css',
})
export class SellCoinDialog {
  public readonly coin = input< OwnedCoins | null >(null);
  public readonly balance = input<number>(0);
  public readonly livePrice = input<number>(0);
  public readonly loading = input<boolean>(false);

  public readonly exit = output();
  public readonly onSellEvent = output<BuyCoinPayload>();

  public readonly inputVal = signal<string>('');

  public readonly priceToSell = computed(() => {
    return Number(this.inputVal()) * ( this.livePrice() ?? this.coin()?.current_price )
  })

  public onSell(c: OwnedCoins):void {
    if ( +this.inputVal() === 0 ) return;
    const readyCoinShape = {
      buy_price: this.livePrice(),
      amount: -Math.abs(+this.inputVal()),
      coin_name: c.coin_name,
      coin_symbol: c.coin_symbol,
      status: 'sold',
      newBalance: 
      this.balance() 
      + (this.livePrice() * +this.inputVal())
    } as BuyCoinPayload;

    this.onSellEvent.emit(readyCoinShape);
  }
}
