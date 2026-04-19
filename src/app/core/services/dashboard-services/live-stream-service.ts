import { inject, Injectable } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { webSocket } from 'rxjs/webSocket';
import { map, Observable, retry, shareReplay, switchMap, scan, auditTime, tap } from 'rxjs';
import { Coin } from '../../types/coin-types';
import { LivePrices } from '../../types/live-prices.types';

@Injectable({
  providedIn: 'root',
})
export class LiveStreamService {

  private dashboardService = inject(DashboardService);

  // filtering top50 coin from coinGecko API
  public topCoins$: Observable<Coin[]> = 
  this.dashboardService.getCoinsData().pipe( 
    map((allCoins: Coin[]) => {
      return [...allCoins]
        .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    }),
  );

  public livePrices$: Observable<LivePrices> = this.topCoins$.pipe(

    switchMap((top100Coins: Coin[]) => {
      const streamUrl = this.buildCombinedUrl(top100Coins);
      
      return webSocket(streamUrl).pipe(
        tap({
          subscribe: () => console.log('WEBSOCKET CONNECTION OPENED!'),
          finalize: () => console.log('WEBSOCKET CLOSED!')
        }),

        map(response => this.formatData(response)),

        scan((acc, curr) => ({ ...acc, ...curr }), {}), // catching separately and combine in {}.

        auditTime(4000), // live stream update timing.

        retry({ delay: 3000 }) // rerun in case of binance servers down.
      );
    }),
    shareReplay(1),
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
