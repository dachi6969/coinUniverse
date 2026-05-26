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
  public readonly loading = signal<boolean>(false);
  public readonly errorMessage = signal<string>('');

  private readonly router = inject(Router);
  private readonly dashboardLayoutService = inject(DashboardLayoutService);
  private readonly securityService = inject(SecurityService);

  public readonly loginHistory = 
  this.securityService.loginHistory;

  private readonly authService = inject(AuthService);
  public readonly user = this.authService.userData;
  public readonly userStatus = this.authService.userStatusData;
  private readonly supabase = this.authService.supabase;

  
  // Password Change.
  public async onSaveChanges(password: string): Promise<void> {
    try{
      this.errorMessage.set('');
      this.loading.set(true);

      const { error } = 
      await this.authService
      .updateUser(password);

      if (error) {
        this.errorCase(error);
        return;
      }
      this.succesfullyCahnge();
    }
    catch(error){
      console.error(error);
    }
    finally{
      this.loading.set(false);
    }
  };

  private succesfullyCahnge(): void{
    alert('Password changed succesfully.');
    this.errorMessage.set('');
  };

  private errorCase(err: Error): void{
    if (err.message.includes('different')) {
      this.errorMessage
      .set('New password must be different from current one.');
    }else{
      console.log(err.message);
    }
  };

  private async deletionDone(): Promise<void> {
    await this.supabase.auth.signOut();
    this.router.navigate(['/dashboard']);
  };
  // Account Deletion.
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
