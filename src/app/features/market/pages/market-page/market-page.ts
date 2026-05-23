import { Component, inject } from '@angular/core';
import { ShoppingTable } from "../../components/shopping-table/shopping-table";
import { CommonModule } from '@angular/common';
import { BuyCoinPayload, Coin, OwnedCoins } from '../../../../core/types/coin-types';
import { ShopDialog } from '../../components/shop-dialog/shop-dialog';
import { BoughtCoinsTable } from "../../components/bought-coins-table/bought-coins-table";
import { MarketService } from '../../services/market-service';
import { SellCoinDialog } from "../../components/sell-coin-dialog/sell-coin-dialog";

@Component({
  selector: 'app-market-page',
  imports: [
    ShoppingTable,
    CommonModule,
    ShopDialog,
    BoughtCoinsTable,
    SellCoinDialog
],
  templateUrl: './market-page.html',
  styleUrl: './market-page.css',
})
export class MarketPage {

  private readonly marketService = inject(MarketService);
  public readonly selectedCoin = this.marketService.selectedCoin;
  public readonly selectedCoinToSell = this.marketService.selectedCoinToSell;
  public readonly loading = this.marketService.loading;
  public readonly userData = this.marketService.userData;
  
  public readonly topCoins$ = 
  this.marketService.topCoins$;

  public readonly boughtCoins$ =
  this.marketService.allCoins$;
  
  public readonly livePrice$ = 
  this.marketService.livePrice$;

  public readonly livePricesToSell$ = 
  this.marketService.livePriceToSell$;

  // METHODS.
  public selectCoinToBuy(c: Coin) {
    this.marketService.selectCoinToBuy(c);
  };
  public selectCoinToSell(c: OwnedCoins) {
    this.marketService.selectCoinToSell(c);
  };

  public exitBuyProcess() {
    this.marketService.exitBuyProcess();
  };
  public exitSellProcess() {
    this.marketService.exitSellProcess();
  };

  public async onCoinTransfer(readyCoin: BuyCoinPayload) {
    this.marketService.addCoinInfo(readyCoin);
  };
}
