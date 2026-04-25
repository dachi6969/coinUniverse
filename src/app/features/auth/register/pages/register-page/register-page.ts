import { Component, inject, signal } from '@angular/core';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth-services/auth-service';
import { SuccesfullyRegisterModal } from "../../components/succesfully-register-modal/succesfully-register-modal";
import { UiButton } from "../../../../../shared/components/ui-button/ui-button";
import { UserService } from '../../../../../core/services/user-service/user-service';
import { RouterLink } from "@angular/router";
import { EMAIL_VALIDATOR, NUMBER_VALIDATOR, PASSWORD_VALIDATOR, USERNAME_VALIDATOR } from '../../../../../core/services/auth-services/validators';

@Component({
  selector: 'app-register-page',
  imports: [LogoIcon, AuthInput, ReactiveFormsModule, SuccesfullyRegisterModal, UiButton, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  public pending = signal<boolean>(false);

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  // forms!
  public form = this.fb.group({
    firstname: ['', USERNAME_VALIDATOR],
    lastname: ['', USERNAME_VALIDATOR],
    email: ['', EMAIL_VALIDATOR],
    number: ['', NUMBER_VALIDATOR],
    password: ['', PASSWORD_VALIDATOR],
    confirm: ['']
  }, { updateOn: 'blur' });


  // checking if password = confirm.
  public isPasswordMismatch() {
    const { password, confirm } = this.form.getRawValue();

    return confirm !== '' ? 
    confirm !== password : 
    false
  };

  private registerDone(): void {
    this.form.reset();
    this.authService.registerUser();
  }

  // login process
  public async onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

    const { 
      email, 
      password, 
      firstname, 
      lastname, 
      number 
    } = this.form.getRawValue();

    if ( this.form.invalid ) return;
    this.pending.set(true); 

    // checking if email is duplicated!
    if ( await this.userService.checkEmail(email ?? '') ) {
      this.form.get('email')?.setErrors({ infoMatched: { fieldName: 'email' } });
      this.pending.set(false); 
      return;
    }
    // checking if number is duplicated!
    if ( await this.userService.checkNumber(number ?? '') ) {
      this.form.get('number')?.setErrors({ infoMatched: { fieldName: 'number' } });
      this.pending.set(false); 
      return;
    }

    // sending registerable data to supabase.
    const { data, error } = await this.authService.supabase.auth.signUp({
      email: email ?? '',   
      password: password ?? '', 
      options: {
        data: {
          firstname: firstname ?? '',
          lastname: lastname ?? '',
          number: number ?? ''
        }
      }
    });
  
    if (error) {
      this.pending.set(false); 
      return;
    }

    this.pending.set(true); 
    this.registerDone();
  }

}
