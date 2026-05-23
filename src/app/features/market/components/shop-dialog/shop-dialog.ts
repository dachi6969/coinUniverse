import { Component, computed, input, output, signal } from '@angular/core';
import { BuyCoinPayload, Coin } from '../../../../core/types/coin-types';
import { CommonModule } from '@angular/common';
import { MaxAmountPipe } from '../../../../shared/pipes/max-amount-pipe';
import { FormsModule } from '@angular/forms';
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { CryptoInputDirective } from '../../../../shared/directives/crypto-input-directive';

@Component({
  selector: 'shop-dialog',
  imports: [
    CommonModule, 
    MaxAmountPipe, 
    FormsModule, 
    UiButton, 
    CryptoInputDirective
  ],
  templateUrl: './shop-dialog.html',
  styleUrl: './shop-dialog.css',
})
export class ShopDialog {
  public readonly coin = input< Coin | null >(null);
  public readonly balance = input<number>(0);
  public readonly livePrice = input<number>(0);
  public readonly loading = input<boolean>(false);

  public readonly exit = output();
  public readonly buyCoin = output<BuyCoinPayload>();

  public readonly inputVal = signal<string>('');

  public priceToBuy = computed(() => {
    return Number(this.inputVal()) * ( this.livePrice() ?? this.coin()?.current_price )
  })

  public onBuy(c: Coin):void {
    if ( this.priceToBuy() > this.balance() ) return;

    const readyCoinShape = {
      buy_price: this.livePrice(),
      amount: +this.inputVal(),
      coin_name: c.name,
      status: 'bought',
      coin_symbol: c.symbol,
      newBalance: 
      this.balance() 
      - (this.livePrice() * +this.inputVal())
    } as BuyCoinPayload;

    this.buyCoin.emit(readyCoinShape);
  }
}
