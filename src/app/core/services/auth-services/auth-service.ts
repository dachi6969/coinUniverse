import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../enviroments/supa-base-env';
import { UserData, UserStatus } from '../../types/user-data.types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { parseUserAgent } from './device-parser';
import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionType } from '../../types/auth-types';
import { Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    
  public supabase: SupabaseClient =  
  createClient(environment.supabaseUrl, environment.supabaseKey); // SupaBase SDK.

  public isUserLoggedIn = signal<boolean>(false);
  public isUserRegistered = signal<boolean>(false);
  public isAuthModalOpen = signal<boolean>(false);

  private deviceParser = parseUserAgent;

  public loginHistory = signal<SessionType[] | null>(null);

  public userData = signal< UserData | null >(null); // current user info.
  public userStatusData = signal<UserStatus | null>(null);

  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {

      if (event === 'SIGNED_OUT') {
        this.isUserLoggedIn.set(false);
        this.userData.set(null);
        this.userStatusData.set(null);
        return;
      }
  
      if (session?.user && !this.isUserLoggedIn()) {
        this.loginUser();
        this.handleUserLogin(session);
      }

    });
  }

  readonly currentIp$: Observable<string> = this.http
  .get<{ ip: string }>('https://api.ipify.org?format=json')
  .pipe(
    map(res => res.ip)
  );

  private async handleUserLogin(session: Session) {
    this.userData.set(session.user.user_metadata as UserData);
    this.userStatusData.set(session.user as UserStatus);
  
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
  
    if (data && !error) {
      this.userData.update(prev => prev ? { ...prev, ...data } : data);
      this.handleLoginHistory(session)
    }
  };

  public async updateLoginHistory() {

    const userId = this.userStatusData()?.id;
    const lastVisit = this.userStatusData()?.last_sign_in_at;

    const currentIp = await firstValueFrom(this.currentIp$);

    const { error: insertError } = await this.supabase
    .from('login_history')
    .insert([{
      user_id: userId,
      ip_address: currentIp,
      device_info: navigator.userAgent,
      created_at: lastVisit
    }]);

  if (insertError) return;

  }

  private async handleLoginHistory(session: Session) {

    const { data: allHistory, error: selectError } = await this.supabase
      .from('login_history')
      .select('*')
      .eq('user_id', session.user.id)
  
    if (allHistory) {
      const deviceInfos = allHistory.map((history) => {
        const mofidiedDevice = this.deviceParser(history.device_info);
        return { ...history, device_info: mofidiedDevice }
      })
      this.loginHistory.set(deviceInfos);
    }
  }

  // METHODS.
  public loginUser(): void {
    this.isUserLoggedIn.set(true);
  };

  public logoutUser(): void {
    this.isUserLoggedIn.set(false);
    this.supabase.auth.signOut();
    this.router.navigate(['dashboard']);
  };

  public registerUser(): void {
    this.isUserRegistered.set(true);
  };
  public resetRegistration(): void {
    this.isUserRegistered.set(false);
  };

  // *******  modals below  *******
  public openAuthModal(): void {
    this.isAuthModalOpen.set(true);
  };

  public closeAuthModal(): void {
    this.isAuthModalOpen.set(false);
  };


}
