import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { from, map, of, switchMap } from 'rxjs';
import { UserNotifyService } from '../user-notifications/user-notify-service';
import { NOTIF_TEMPLATES } from '../../constants/notifications';
import { BuyCoinPayload } from '../../types/coin-types';


@Injectable({
  providedIn: 'root',
})
export class UserCoinsService {

  private readonly auth = inject(AuthService);
  private readonly supabase = this.auth.supabase;
  private readonly userData = this.auth.userData;

  private readonly notifyService = inject(UserNotifyService);

  private readonly uData$ = toObservable(this.userData);


  public ownedCoinsStream$ = this.uData$
  .pipe(
    switchMap(user => {
      const id = user?.id;
      if (!id) return of([]);

      return from(
        this.supabase
          .from('coins')
          .select('*')
          .eq('user_id', id)
      ).pipe(
        map(res => res.data || []), 
      );
    })
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
