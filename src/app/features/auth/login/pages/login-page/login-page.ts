import { Component, inject, signal } from '@angular/core';
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../../../core/services/auth-services/validation-service';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { UiButton } from "../../../../../shared/components/ui-button/ui-button";
import { AuthService } from '../../../../../core/services/auth-services/auth-service';
import { finalize } from 'rxjs';
import { UserData } from '../../../../../core/types/user-data.types';

@Component({
  selector: 'app-login-page',
  imports: [AuthInput, ReactiveFormsModule, LogoIcon, UiButton],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private rememberedEmail = signal<string | null>(null);

  public pending = signal<boolean>(false);
  public isChecked = signal<boolean>(false);

  private authService = inject(AuthService);
  private validationService = inject(ValidationService);

  public form = new FormGroup({
    email: new FormControl ('', [ 
      this.validationService.required,
      this.validationService.emailValidation
    ]),
    password: new FormControl ('', [
      this.validationService.required,
      this.validationService.passwordValidation
    ])
  }, {
    updateOn: 'submit'
  });

  constructor() {
    const savedEmail = window.localStorage.getItem('rememberedEmail');
  
    if (savedEmail) {
      this.rememberedEmail.set(savedEmail);
  
      // remembered email from LS or ''.
      this.form.patchValue({ 
        email: savedEmail
      });
      this.isChecked.set(true);
    }
  };

  loginDone(): void {
    if ( this.isChecked() ) {
      const email = this.form.getRawValue()['email'];

      localStorage.setItem('rememberedEmail',email ?? '');
    };

    this.form.reset();
    // profile navigation logic will be here
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

    if ( this.form.invalid ) return;

    const userData = this.form.getRawValue() as UserData;
    this.pending.set(true);

    this.authService.getUserData(userData)
    .pipe( 
      finalize(() => this.pending.set(false) ) 
    )
    .subscribe({
      next: (resp) => {
        if ( !resp.length ) {
          this.form.setErrors({ invalidLogin: true });
          return;
        }
        
        this.loginDone();
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  check(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
  
    if (checked) {
      this.isChecked.set(true);
      return;
    }

    this.isChecked.set(false);
  }

}
