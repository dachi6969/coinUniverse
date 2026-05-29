import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, from, map, of, shareReplay, switchMap } from 'rxjs';
import { UserNotifyService } from '../user-notifications/user-notify-service';
import { NOTIF_TEMPLATES } from '../../constants/notifications';
import { BoughtCoins, BuyCoinPayload, CoinShape } from '../../types/coin-types';
import { LiveStreamService } from '../dashboard-services/live-stream-service';
import { UserData } from '../../types/user-data.types';


@Injectable({
  providedIn: 'root',
})
export class UserCoinsService {

  private readonly auth = inject(AuthService);
  private readonly supabase = this.auth.supabase;
  private readonly userData = this.auth.userData;

  private readonly notifyService = inject(UserNotifyService);

  private readonly uData$ = toObservable(this.userData);

  private readonly liveStreamService = 
  inject(LiveStreamService);

  // price fallback here, livePrice ?? current coin price from coingecko api(cached).
  public readonly top100LiveCoins$ = 
  this.liveStreamService.top100LiveCoins$;

  // brings current user's transactions, if user exist(loggedIN).
  public readonly coinTransactions$ = this.uData$.pipe(
    filter((user): user is UserData => !!user?.id),
  
    switchMap(user =>
      from(
        this.supabase
          .from('coins')
          .select('*')
          .eq('user_id', user.id)
      ).pipe(
        map(res => res.data || [])
      )
    ),
    shareReplay(1),
  );
  
  // counting user's avalible coins, rely on transaction's history.
  private readonly ownedCoins$ =
  this.coinTransactions$.pipe(
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

  public readonly avalibleCoins$ = this.ownedCoins$
  .pipe(
    switchMap(boughts => {
      const hasBoughtCoins = Object.keys(boughts).length > 0;

      if (!hasBoughtCoins) {
        return of([]);
      }
      return this.top100LiveCoins$.pipe(
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
    shareReplay(1),
  );

  private buyNotification(amount: string, symbol: string): void {
    this,this.notifyService.sendNotification(
      NOTIF_TEMPLATES['BUY_SUCCESS'],
      { amount, symbol }
    )
  }
  private sellNotification(amount: string, symbol: string): void {
    this,this.notifyService.sendNotification(
      NOTIF_TEMPLATES['SELL_SUCCESS'],
      { amount, symbol }
    )
  }

  // METHODS..
  public async pushCoin(uid: string, c: BuyCoinPayload): 
  Promise<boolean> 
  {
    const { newBalance, ...coin } = c

    const coinInfo = 
    {...coin,user_id: uid, bought_at: new Date()};

    const buyProcess =  
    this.supabase
    .from('coins')
    .insert(coinInfo)
    .select()
    .single()

    const balanceUpdate = 
    this.supabase
    .from('profiles')
    .update({ balance: newBalance })
    .eq('id', uid)

    const [buyResult, balanceResult] = 
    await Promise.all([buyProcess,balanceUpdate]);

    if ( buyResult.error || balanceResult.error ) {
      console.error( buyResult.error || balanceResult.error );
      return false;
    }

    const { status, coin_symbol, amount } = buyResult.data

    status === 'bought' ? 
    this.buyNotification(amount,coin_symbol) : 
    this.sellNotification(amount,coin_symbol)

    this.auth.updateUserBalance(newBalance);
    return true
  }
  
}
