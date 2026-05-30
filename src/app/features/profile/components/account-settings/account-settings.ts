import { Component, inject, input, output } from '@angular/core';
import { AuthInput } from "../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CONFIRM_VALIDATOR, PASSWORD_VALIDATOR } from '../../../../core/services/auth-services/validators';
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { UserData } from '../../../../core/types/user-types/user-data.types';

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
  public readonly user = input<UserData | null>(null);
  public readonly loading = input<boolean>(false);
  public readonly errorMessage = input<string>('');

  public readonly saveChange = output<string>();

  private readonly fb = inject(FormBuilder);

  public readonly form = this.fb.group({
    password: ['', PASSWORD_VALIDATOR],
    confirm: ['', CONFIRM_VALIDATOR]
  }, 
  { updateOn: 'change' });


  public async onSaveChanges(): Promise<void> {
    if ( this.form.invalid ) return;

    const { password } = this.form.getRawValue();
    if (!password) return;

    this.saveChange.emit(password);
  };

}
