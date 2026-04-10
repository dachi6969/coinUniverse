import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { Coin, MarketChartResponse } from '../types/coin-types';

export const DASHBOARD_COINS_URL = 
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  
  private coinsRequest$?: Observable<Coin[]>;

  private http = inject(HttpClient);

  oneDayResults(id: string): Observable<MarketChartResponse>{
    return this.http.get<MarketChartResponse>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)
    .pipe(
      tap(() => {console.log('this is oneDayResults request')}),
      shareReplay(1)
    )
  }

  getCoinsData(): Observable<Coin[]> {

    if (!this.coinsRequest$) {
      this.coinsRequest$ = this.http.get<Coin[]>(DASHBOARD_COINS_URL).pipe(
        tap(() => {console.log('this is getCoinsData request')}),
        shareReplay(1) 
      );
    }

    return this.coinsRequest$;
  }

}
