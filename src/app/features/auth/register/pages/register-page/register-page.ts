import { Component, inject, signal } from '@angular/core';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth-services/auth-service';
import { SuccesfullyRegisterModal } from "../../components/succesfully-register-modal/succesfully-register-modal";
import { UiButton } from "../../../../../shared/components/ui-button/ui-button";
import { UserService } from '../../../../../core/services/user-service/user-service';
import { RouterLink } from "@angular/router";
import { CONFIRM_VALIDATOR, EMAIL_VALIDATOR, NUMBER_VALIDATOR, PASSWORD_VALIDATOR, USERNAME_VALIDATOR } from '../../../../../core/services/auth-services/validators';
import { CreateUserDTO } from '../../../../../core/types/user-types/user-data.types';

@Component({
  selector: 'app-register-page',
  imports: [
    LogoIcon, 
    AuthInput, 
    ReactiveFormsModule, 
    SuccesfullyRegisterModal, 
    UiButton, 
    RouterLink
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  public pending = signal<boolean>(false);

  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  // forms!
  public readonly form = this.fb.group({
    firstname: ['', USERNAME_VALIDATOR],
    lastname: ['', USERNAME_VALIDATOR],
    email: ['', EMAIL_VALIDATOR],
    number: ['', NUMBER_VALIDATOR],
    password: ['', PASSWORD_VALIDATOR],
    confirm: ['', CONFIRM_VALIDATOR]
  }, { updateOn: 'blur' });

  private async registerDone(): Promise<void> {
    this.form.reset();
    this.authService.registerUser();
  };

  private setEmailErr(): void {
    this.form
    .get('email')
    ?.setErrors(
      { infoMatched: { fieldName: 'email' } }
    );
  };
  private setNumberErr(): void {
    this.form
    .get('number')
    ?.setErrors(
      { infoMatched: { fieldName: 'number' } }
    );
  };

  // login process
  public async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();
    
    if ( this.form.invalid ) return;
    this.pending.set(true); 

    const { confirm, ...user } = 
    this.form.getRawValue() as CreateUserDTO;

    try{
      const [takenEmail, takenNumber] = 
      await Promise.all([
        this.userService.checkEmail(user.email ?? ''),
        this.userService.checkNumber(user.number ?? '')
      ]);

      if ( takenEmail ) {
        this.setEmailErr();
        return;
      };
      if ( takenNumber ) {
        this.setNumberErr();
        return;
      };

      const { error } = 
      await this.authService.signUp(user);
  
      if (error) {
        console.error('Supabase err:',error);
        return;
      }
      this.registerDone();
    }
    catch(err) {
      console.error(err);
    }
    finally{
      this.pending.set(false); 
    }
  }

}
