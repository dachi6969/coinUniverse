import { inject, Injectable, signal } from '@angular/core';
import { SecurityService } from '../../../core/services/security-service/security-service';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/services/dashboard-layout-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  public readonly pending = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly dashboardLayoutService = inject(DashboardLayoutService);
  private readonly securityService = inject(SecurityService);

  public readonly loginHistory = 
  this.securityService.loginHistory;

  private readonly authService = inject(AuthService);
  public readonly user = this.authService.userData;
  public readonly userStatus = this.authService.userStatusData;
  private readonly supabase = this.authService.supabase;

  private async deletionDone(): Promise<void> {
    await this.supabase.auth.signOut();
    this.router.navigate(['/dashboard']);
  };

  public async onDeleteAccount(): Promise<void> {
    this.pending.set(true);

    try{
      const { error } = 
      await this.supabase
      .rpc('delete_user_account');

      if (error) {
        console.error('supabase deletion error:', error.message);
        return;
      }
      this.deletionDone();
    }
    catch(err) {
      console.error(err);
    }
    finally{
      this.pending.set(false);
    };
  };

  public onProfileLeave(): void {
    this.dashboardLayoutService.isProfilePage.set(false);
  };
  
}
