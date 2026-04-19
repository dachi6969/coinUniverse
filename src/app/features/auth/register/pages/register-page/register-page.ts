import { Component, inject, signal } from '@angular/core';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../../../core/services/auth-services/validation-service';
import { AuthService } from '../../../../../core/services/auth-services/auth-service';
import { SuccesfullyRegisterModal } from "../../components/succesfully-register-modal/succesfully-register-modal";
import { UiButton } from "../../../../../shared/components/ui-button/ui-button";
import { finalize } from 'rxjs';
import { CreateUserDTO } from '../../../../../core/types/user-data.types';

@Component({
  selector: 'app-register-page',
  imports: [LogoIcon, AuthInput, ReactiveFormsModule, SuccesfullyRegisterModal, UiButton],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  public pending = signal<boolean>(false);

  private validationService = inject(ValidationService);
  private authService = inject(AuthService);

  public form = new FormGroup({
    firstname: new FormControl('', [
      this.validationService.required,
      this.validationService.usernameValidation
    ]),
    lastname: new FormControl('', [
      this.validationService.required,
      this.validationService.usernameValidation
    ]),
    email: new FormControl('', [
      this.validationService.required,
      this.validationService.emailValidation
    ]),
    number: new FormControl('', [
      this.validationService.required,
      this.validationService.numberValidation
    ]),
    password: new FormControl('', [
      this.validationService.required,
      this.validationService.passwordValidation
    ]),
    confirm: new FormControl(''),
  },{
    updateOn: 'blur'
  })

  isPasswordMismatch() {
    const { password, confirm } = this.form.getRawValue();

    return confirm !== '' ? 
    confirm !== password : 
    false
  };

  registerDone(): void {
    this.form.reset();
    this.authService.registerUser();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

    if ( this.form.invalid ) return;
    if ( this.isPasswordMismatch() ) return;

    // 1. remove confirm line from user info {}.
    const { confirm, ...userData } = this.form.getRawValue() as CreateUserDTO;

    this.pending.set(true); // for loading spinner
    // 2. checking user's Info!
    this.authService.signUp(userData)
    .pipe( finalize(() => this.pending.set(false)) )
    .subscribe({
      next: (response) => {
        console.log('ეგაა! იუზერი ბაზაში ჩაიწერა!');
        this.registerDone();
      },
      error: (error) => {
        switch ( error.status ) {
          case 409: 
          const message = error.error.details;

          const match = message.match(/Key \((.*?)\)=/);
  
          const field = match ? match[1] : null;
  
          const control = this.form.get(`${field}`);
  
          control?.setErrors({
            infoMatched: {
            fieldName: field
            }
          })
          break;

          case 400: 
          console.log('invalid columns in supabase table!');
          break;
        }
      },
    });
  }

}
