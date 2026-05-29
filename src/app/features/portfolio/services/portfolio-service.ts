import { inject, Injectable } from '@angular/core';
import { UserCoinsService } from '../../../core/services/user-coins/user-coins-service';
import { combineLatest, map } from 'rxjs';
import { LiveStreamService } from '../../../core/services/dashboard-services/live-stream-service';
import { AuthService } from '../../../core/services/auth-services/auth-service';


@Injectable({
  providedIn: 'root',
})
export class PortfolioService {

  private readonly userCoinsService = inject(UserCoinsService);
  private readonly liveStreamService = inject(LiveStreamService);
  private readonly authService = inject(AuthService);
  public readonly user = this.authService.userData;
  public readonly isLoggedIn = this.authService.isUserLoggedIn;

  public readonly top100coins$ = 
  this.liveStreamService.topCoins$;

  public readonly top100LiveCoins$ = 
  this.liveStreamService.top100LiveCoins$;

  private readonly coinHistory$ = 
  this.userCoinsService.coinTransactions$
  .pipe(map(history => history.reverse()));

  public readonly coinTransaction$ =
  combineLatest([
    this.top100coins$,
    this.coinHistory$
  ]).pipe(
    map(([topCoins, history]) => {
  
      return history.map(transaction => {
        const coin = topCoins.find(
          c => c.symbol === transaction.coin_symbol
        );
  
        return {
          ...transaction,
          current_price: coin?.current_price ?? null,
          img: coin?.image
        };
      });
  
    })
  );

  // counts avalible assets.
  public readonly avalibleCoins$ = 
  this.userCoinsService.avalibleCoins$

  // HIGHTLIGHTS LOGIC.
  public readonly hightlightsData$ = this.avalibleCoins$
  .pipe(
    map((avalibleCoins) => {
      if ( avalibleCoins && !avalibleCoins.length ) return {};
      const benefitsArr = avalibleCoins.map(c => {
        const benefits =
          100 * ((c.current_price - c.buy_price) / c.buy_price);
    
        return {
          symbol: c.coin_symbol,
          img: c.img,
          profitPercent: Number(benefits.toFixed(3))
        };
      });
    
      const topPerformer = benefitsArr.reduce((max, coin) =>
        coin.profitPercent > max.profitPercent ? coin : max
      );
    
      const totalProfit = avalibleCoins.reduce((sum, coin) => {
        const priceDifference =
          coin.current_price - coin.buy_price;
    
        return sum + (priceDifference * coin.amount);
      }, 0);
    
      return {
        avalibleCoinsQuaintity: avalibleCoins.length,
        topPerformer,
        profit: totalProfit
      };
    })
  )

}
