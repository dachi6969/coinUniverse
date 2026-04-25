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

  readonly inputValue = signal('');

  public canDelete = signal<boolean>(false);
  public pending = signal<boolean>(false);

  private authService = inject(AuthService);
  private supabase = this.authService.supabase;

  private router = inject(Router);

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

  private async deletionDone() {
    await this.supabase.auth.signOut();
    this.router.navigate(['/dashboard']);
  }

  public async onDeleteAccount() {
    if ( !this.canDelete() ) return;

    this.pending.set(true);

    const { data, error } = await this.supabase.rpc('delete_user_account');
  
    if (error) {
      console.error('Error deleting account:', error.message);
      this.pending.set(false);
    } else {
      this.deletionDone();
      this.pending.set(false);
    }
  }

}
