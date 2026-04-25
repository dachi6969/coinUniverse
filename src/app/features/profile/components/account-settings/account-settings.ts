import { Component, inject, signal } from '@angular/core';
import { AuthInput } from "../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-services/auth-service';
import { PASSWORD_VALIDATOR, REQUIRED_VALIDATOR } from '../../../../core/services/auth-services/validators';
import { UiButton } from "../../../../shared/components/ui-button/ui-button";

@Component({
  selector: 'account-settings',
  imports: [AuthInput, ɵInternalFormsSharedModule, ReactiveFormsModule, UiButton],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.css',
})
export class AccountSettings {

  public loading = signal<boolean>(false);
  public errorMessage = signal<string>('');

  private authService = inject(AuthService);
  public user = this.authService.userData;

  private supabase = this.authService.supabase;

  private fb = inject(FormBuilder);

  public form = this.fb.group({
    password: ['', PASSWORD_VALIDATOR],
    confirm: ['', REQUIRED_VALIDATOR]
  }, 
  { updateOn: 'change' });

  public isPasswordMismatch(): boolean {
    const { password, confirm } = this.form.getRawValue();

    return confirm !== '' ? 
    confirm !== password : 
    false
  };

  public async onSaveChanges() {
  if (this.form.invalid || this.isPasswordMismatch()) return;

  const { password } = this.form.getRawValue();

  if (!password) return;

  this.errorMessage.set('');
  this.loading.set(true);

  const { data, error } = await this.supabase.auth.updateUser({
    password: password
  });

  this.loading.set(false);

  if (error) {
    if (error.message.includes('different')) {
      this.errorMessage.set('New password must be different from your current one.');
    } else {
      console.error('error: ' + error.message);
    }
  } else {
    alert('Password changed succesfully.');
    this.loading.set(false);
    this.form.reset();
  }
  }

}
