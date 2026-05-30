import { inject, Injectable, signal } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard-services/dashboard-service';
import { catchError, distinctUntilChanged, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Coin } from '../../../core/types/coin-types/coin-types';
import { LiveStreamService } from '../../../core/services/dashboard-services/live-stream-service';

@Injectable({
  providedIn: 'root',
})
export class MainDashboardService {
  public isChartError = signal<boolean>(false);
  public selectedCoin = signal<Coin | null>(null);

  private readonly last24hPricesCache$ = 
  new Map<string, Observable<number[] | null>>();

  private readonly selected$: Observable<string> = 
  toObservable(this.selectedCoin)
  .pipe(
    map(coin => coin?.id ?? 'bitcoin'),
    distinctUntilChanged()
  );

  private readonly liveStreamService = inject(LiveStreamService);
  private readonly dashboardService = inject(DashboardService);

  public readonly selectedCoin$ =
  this.selected$.pipe(
    switchMap((coinName: string) => {
      return this.topCoins$
      .pipe(
        map(coins => coins.find(c => c.id === coinName))
      )
    }),
  );

  public readonly topCoins$ = 
  this.liveStreamService.topCoins$;

  public readonly top100LiveCoins$ = 
  this.liveStreamService.top100LiveCoins$;

  readonly targetHours = [0, 3, 6, 9, 12, 15, 18, 21];

  readonly last24hPrices$ = this.selected$
  .pipe(
      switchMap((coinName: string) => {
  
        if (!this.last24hPricesCache$.has(coinName)) {
          const request$ = this.dashboardService.oneDayResults(coinName).pipe(
            map((response) => {
              const prices = response.prices;
  
              const processed = prices.map(([ts, price]) => ({
                hour: new Date(ts).getHours(),
                price: price,
                formattedTime: new Date(ts).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })
              }));
  
              return this.targetHours.map(target => {
                const match = processed.find(item => item.hour === target);
                return match ? Math.round(match.price) : 0;
              });
            }),
            catchError(() => {
              this.isChartError.set(true);
              this.last24hPricesCache$.delete(coinName);
              return of(null);
            }),
            shareReplay(1) 
          );
  
          this.last24hPricesCache$.set(coinName, request$);
        }
  
        return this.last24hPricesCache$.get(coinName)!;
      })
    );

  public readonly dashboardData$ = 
  this.liveStreamService.top100LiveCoins$
  .pipe(
    map(coins => {
      // 1. Filter to avoid errors
      const withChange = coins.filter(c => c.price_change_percentage_24h != null);
      
      // 2. Get BTC
      const btc = coins.find(c => c.id === "bitcoin");
  
      // 3. Find Top gainer
      const topGainer = withChange.reduce((prev, curr) => 
        curr.price_change_percentage_24h > prev.price_change_percentage_24h ? curr : prev
      );
  
      // 4. Find Top loser
      const topLoser = withChange.reduce((prev, curr) => 
        curr.price_change_percentage_24h < prev.price_change_percentage_24h ? curr : prev
      );
  
      // 5. Find Top volume
      const topVolume = coins.reduce((prev, curr) => 
        curr.total_volume > prev.total_volume ? curr : prev
      );
      
      return { btc, topGainer, topLoser, topVolume };
    })
  );

  public readonly exchangesData$ = 
  this.dashboardService.getTopCryptoExchanges$;

  public onSelect(c: Coin): void {
    this.selectedCoin.set(c);
  };

  public onRetry(): void {
    this.selectedCoin.set(null);
    this.isChartError.set(false);
  };
  
}
