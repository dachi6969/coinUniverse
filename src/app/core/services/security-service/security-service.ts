import { effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { parseUserAgent } from '../auth-services/device-parser';
import { SessionType } from '../../types/auth-types';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly supabase = this.authService.supabase;

  private readonly deviceParser = parseUserAgent;

  public loginHistory = signal<SessionType[] | null>(null);

  readonly currentIp$: Observable<string> = this.http
  .get<{ ip: string }>('https://api.ipify.org?format=json')
  .pipe(
    map(res => res.ip)
  );

  constructor() {
    effect(() => {
      const userId = this.authService.userStatusData()?.id;
      
      if ( userId ) {
        this.handleLoginHistory(userId)
      }
    })
  }

  public async updateLoginHistory() {
    const uid = this.authService.userStatusData()?.id;
    const lastVisit = this.authService.userStatusData()?.last_sign_in_at;

    const currentIp = await firstValueFrom(this.currentIp$);

    const { error: insertError } = await this.supabase
    .from('login_history')
    .insert([{
      user_id: uid,
      ip_address: currentIp,
      device_info: navigator.userAgent,
      created_at: lastVisit
    }]);

  if (insertError) return;

  this.handleLoginHistory(uid)
  }

  private async handleLoginHistory(uid?: string) {

    const { data: allHistory, error: selectError } = await this.supabase
      .from('login_history')
      .select('*')
      .eq('user_id', uid)
  
    if (allHistory) {
      const deviceInfos = allHistory.map((history) => {
        const mofidiedDevice = this.deviceParser(history.device_info);
        return { ...history, device_info: mofidiedDevice }
      })
      this.loginHistory.set(deviceInfos);
    }
  }
  
}
