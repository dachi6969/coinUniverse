import { inject, Injectable } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { webSocket } from 'rxjs/webSocket';
import { map, Observable, retry, shareReplay, switchMap, scan, auditTime, combineLatest, startWith } from 'rxjs';
import { Coin } from '../../types/coin-types';
import { LivePrices } from '../../types/live-prices.types';

@Injectable({
  providedIn: 'root',
})
export class LiveStreamService {

  private readonly dashboardService = inject(DashboardService);

  // filtering top100 coin from coinGecko API
  public topCoins$: Observable<Coin[]> = 
  this.dashboardService.top100coin$.pipe( 
    map((allCoins: Coin[]) => {
      return [...allCoins]
        .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    }),
  );


  public livePrices$: Observable<LivePrices> = this.topCoins$.pipe(

    switchMap((top100Coins: Coin[]) => {
      const streamUrl = this.buildCombinedUrl(top100Coins);
      
      return webSocket(streamUrl).pipe(

        map(response => this.formatData(response)),

        scan((acc, curr) => ({ ...acc, ...curr }), {}), // catching separately and combine in {}.

        auditTime(4000), // live stream update timing.

        retry({ delay: 3000 }) // rerun in case of binance servers down.
      );
    }),
    shareReplay(1),
  );

  // grouped 100coin + live prices.
  public readonly top100LiveCoins$ = 
  combineLatest([
    this.topCoins$,
    this.livePrices$
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

  private buildCombinedUrl(coins: any[]): string { // binding coinNames in url.
    const streams = coins
      .map(coin => `${coin.symbol.toLowerCase()}usdt@ticker`)
      .join('/'); 

    return `wss://stream.binance.com:9443/stream?streams=${streams}`;
  }

  private formatData(response: any): { [key: string]: number } {
    const formatted: { [key: string]: number } = {};
    
    if (response?.data?.s && response?.data?.c) {
      formatted[response.data.s] = parseFloat(response.data.c);
    }
    
    return formatted;
  }
}
