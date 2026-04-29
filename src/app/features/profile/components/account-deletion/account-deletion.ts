import { Component, signal, effect, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'account-deletion',
  imports: [],
  templateUrl: './account-deletion.html',
  styleUrl: './account-deletion.css',
})
export class AccountDeletion {
  public readonly inputValue = signal('');

  public canDelete = signal<boolean>(false);
  public pending = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly supabase = this.authService.supabase;

  constructor() {
    effect(() => {
      const value = this.inputValue().trim();
      if ( value === 'DELETE' ) {
        this.canDelete.set(true);
      }else{
        this.canDelete.set(false);
      }
    })
  }

  private async deletionDone(): Promise<void> {
    await this.supabase.auth.signOut();
    this.router.navigate(['/dashboard']);
  }

  public async onDeleteAccount(): Promise<void> {
    if ( !this.canDelete() ) return;

    try{
      this.pending.set(true);
      const { data, error } = 
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
  }

}
