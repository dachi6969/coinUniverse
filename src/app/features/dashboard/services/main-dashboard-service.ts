import { inject, Injectable, signal } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard-service';
import { catchError, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CryptoExchange } from '../../../core/types/coin-types';

@Injectable({
  providedIn: 'root',
})
export class MainDashboardService {
  
  readonly selectedCoin = signal<string>('bitcoin');
  readonly selectedTimeFrame = signal<number>(1);

  selected$ = 
  toObservable(this.selectedCoin);

  private dashboardService = inject(DashboardService);

  readonly selectedCoin$ =
  this.selected$.
  pipe(
    switchMap((coinName: string) => {
      return this.dashboardService.getCoinsData()
      .pipe(
        map(coins => coins.find(c => c.id === coinName))
      )
    }),
  );

  readonly targetHours = [0, 3, 6, 9, 12, 15, 18, 21];
  readonly targetDays = [];

  readonly perDay$: Observable<number[]> = 
  this.selected$.pipe(
    switchMap((coinName: string) => {

      return  this.dashboardService.oneDayResults(coinName).pipe(
        map((response) => {
          const prices = response.prices;
      
          const processed = prices.map(([ts, price]) => ({
            hour: new Date(ts).getHours(),
            price: price,
            formattedTime: new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
          }));
      
          return this.targetHours.map(target => {
            const match = processed.find(item => item.hour === target);
            
            return match ? Math.round(match.price) : 0
             
          });
        }),
        catchError(() => {
          return of([]);
        })
      )
    })
  );

  readonly dashboardData$ = this.dashboardService.getCoinsData().pipe(
    map(coins => {
      // 1. Get BTC
      const btc = coins.find(c => c.id === "bitcoin");
  
      // 2. Filter to avoid errors
      const withChange = coins.filter(c => c.price_change_percentage_24h != null);
  
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

      const topValues = 
      [...coins]
      .sort((a, b) => b.current_price - a.current_price)
      .slice(0, 10)
      return { btc, topGainer, topLoser, topVolume, topValues };
    }),
    shareReplay(1)
  );

  readonly exchangesData$: Observable<CryptoExchange[]> = 
  this.dashboardService.getTopCryptoExchanges();
  

}
