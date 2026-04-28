import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../enviroments/supa-base-env';
import { UserData, UserStatus } from '../../types/user-data.types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';
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

  public userData = signal< UserData | null >(null); // current user info.
  public userStatusData = signal<UserStatus | null>(null);

  private router = inject(Router);

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
    }
  };

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
