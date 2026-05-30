import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Coin, CryptoExchange, MarketChartResponse } from '../../types/coin-types/coin-types';

export const TOP_100_COIN_URL = 
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";

export const TOP_50_EXCHANGE_URL = 
'https://api.coingecko.com/api/v3/exchanges?per_page=50';

export const ONE_DAY_RESULTS_URL = 
(coinId: string) => `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly http = inject(HttpClient);

  // fetching current selected coin prices( for chart !).
  public oneDayResults(id: string): 
  Observable<MarketChartResponse>{
    return this.http.get<MarketChartResponse>(ONE_DAY_RESULTS_URL(id))
  };

  // fetching top100 coin data.
  public readonly top100coin$: Observable<Coin[]> = 
  this.http.get<Coin[]>(TOP_100_COIN_URL)
  .pipe( shareReplay(1) );

  // fetching top 50 exchange platform data.
  public readonly getTopCryptoExchanges$: 
  Observable<CryptoExchange[]> = 
  this.http
  .get<CryptoExchange[]>(TOP_50_EXCHANGE_URL)
  .pipe( shareReplay(1) );

}
