import { Component, inject, signal } from '@angular/core';
import { AuthInput } from "../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-services/auth-service';
import { CONFIRM_VALIDATOR, PASSWORD_VALIDATOR } from '../../../../core/services/auth-services/validators';
import { UiButton } from "../../../../shared/components/ui-button/ui-button";

@Component({
  selector: 'account-settings',
  imports: [
    AuthInput, 
    ReactiveFormsModule, 
    UiButton
  ],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.css',
})
export class AccountSettings {
  public loading = signal<boolean>(false);
  public errorMessage = signal<string>('');

  private readonly authService = inject(AuthService);
  public readonly user = this.authService.userData;

  private readonly fb = inject(FormBuilder);

  public readonly form = this.fb.group({
    password: ['', PASSWORD_VALIDATOR],
    confirm: ['', CONFIRM_VALIDATOR]
  }, 
  { updateOn: 'change' });

  private errorCase(err: Error): void{
    if (err.message.includes('different')) {
      this.errorMessage
      .set('New password must be different from current one.');
    }else{
      console.log(err.message);
    }
  };

  private succesfullyCahnge(): void{
    alert('Password changed succesfully.');
    this.form.reset();
    this.errorMessage.set('');
  };

  public async onSaveChanges(): Promise<void> {
  if ( this.form.invalid ) return;

  const { password } = this.form.getRawValue();
  if (!password) return;

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
  }

}
