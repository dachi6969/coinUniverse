import { inject, Injectable, signal } from '@angular/core';
import { LiveStreamService } from '../../../core/services/dashboard-services/live-stream-service';
import { combineLatest, map, Observable, of, startWith, switchMap } from 'rxjs';
import { LivePrices } from '../../../core/types/live-prices.types';
import { BoughtCoins, BuyCoinPayload, Coin, CoinShape, OwnedCoins } from '../../../core/types/coin-types';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { UserCoinsService } from '../../../core/services/user-coins/user-coins-service';

@Injectable({
  providedIn: 'root',
})
export class MarketService {

  public selectedCoin = signal<Coin | null>(null);
  public selectedCoinToSell = signal< OwnedCoins | null >(null);
  public loading = signal<boolean>(false);

  private readonly authService = inject(AuthService);
  private readonly isLoggedIn = this.authService.isUserLoggedIn;
  public readonly userData = this.authService.userData;

  private readonly userCoinsService = inject(UserCoinsService);

  private readonly liveStreamService = 
  inject(LiveStreamService);

  // price fallback here, livePrice ?? current coin price from coingecko api(cached).
  public readonly topCoins$ = 
  combineLatest([
    this.liveStreamService.topCoins$,
    this.liveStreamService.livePrices$
    .pipe( startWith({}as LivePrices) )
  ]).pipe(
    map(([topCoins,livePrices]) => {

      const modified = topCoins.map(c => {
        return {
          ...c,
          current_price: 
          livePrices[(c.symbol).toUpperCase() + 'USDT'] 
          ?? c.current_price
        }
      });
      return modified;
    })
  );

  private getLivePrice(
    selectedCoin: () => any | null
  ): Observable<number | null> {
    return this.liveStreamService.livePrices$.pipe(
      startWith({} as LivePrices),
      map(liveP => {
        const selected = selectedCoin();
  
        if (!selected) return null;
  
        const symbol =
          selected.symbol?.toUpperCase() ??
          selected.coin_symbol?.toUpperCase();
  
        if (!symbol) return null;
  
        return (
          liveP[symbol + 'USDT'] ??
          selected.current_price
        );
      })
    );
  }
  
  public readonly livePrice$ =
    this.getLivePrice(() => this.selectedCoin());
  
  public readonly livePriceToSell$ =
    this.getLivePrice(() => this.selectedCoinToSell());

    private readonly boughtCoins$ =
    this.userCoinsService.ownedCoinsStream$.pipe(
      map((coins: CoinShape[]) =>
        coins.reduce((acc, cur) => {
          const symbol = cur.coin_symbol;
  
          if (!acc[symbol]) {
            acc[symbol] = { ...cur };
          } else {
            acc[symbol].amount += cur.amount;
          }
  
          // remove immediately if 0
          if (acc[symbol].amount === 0) {
            delete acc[symbol];
          }
  
          return acc;
        }, {} as BoughtCoins)
      )
    );

    public readonly allCoins$ = this.boughtCoins$.pipe(
      switchMap(boughts => {
        const hasBoughtCoins = Object.keys(boughts).length > 0;

        if (!hasBoughtCoins) {
          return of([]);
        }
    
        return this.topCoins$.pipe(
          map(topCoins => {
            return topCoins
              .filter(coin => boughts[coin.symbol])
              .map(item => ({
                ...boughts[item.symbol],
                img: item.image,
                current_price: item.current_price
              }));
          })
        );
      }),
    );

  // METHODS.
  public selectCoinToBuy(c: Coin): void {
    if ( !this.isLoggedIn() ) {
      this.authService.openAuthModal();
      return;
    }
    this.selectedCoin.set(c);
  };
  public selectCoinToSell(c: OwnedCoins): void {
    this.selectedCoinToSell.set(c);
  };
  public exitBuyProcess() {
    this.selectedCoin.set(null);
  };
  public exitSellProcess() {
    this.selectedCoinToSell.set(null);
  };

  public async addCoinInfo(readyCoin: BuyCoinPayload) {
    const uid = this.userData()?.id;
    if ( !uid ) return

    this.loading.set(true);

    const bprocess = 
    await this.userCoinsService
    .pushCoin(uid,readyCoin);

    if (bprocess) {
      this.loading.set(false);
      this.selectedCoin.set(null);
      this.selectedCoinToSell.set(null);
    }
  }
  
}
