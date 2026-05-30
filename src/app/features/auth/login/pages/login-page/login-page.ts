import { Component, inject, OnInit } from '@angular/core';
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { UiButton } from "../../../../../shared/components/ui-button/ui-button";
import { RouterLink } from '@angular/router';
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from '../../../../../core/services/auth-services/validators';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login-page',
  imports: [
    AuthInput, 
    ReactiveFormsModule, 
    LogoIcon, 
    UiButton, 
    RouterLink
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  public readonly errMsg: string = 
  'Invalid email or password. Please try again.';

  private readonly loginService = inject(LoginService);
  public readonly isChecked = this.loginService.isChecked;
  public readonly pending = this.loginService.pending;

  private readonly fb = inject(FormBuilder);

  // forms!
  public readonly form = 
  this.fb.nonNullable
  .group({
    email: ['', EMAIL_VALIDATOR],
    password: ['', PASSWORD_VALIDATOR]
  }, { updateOn: 'submit' });

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('rememberedEmail');
  
    if (savedEmail) {  
      this.form.patchValue({ email: savedEmail });
      this.loginService.checkEmail();
    }
  };

  // METHODS.
  private handleError(errStatus: string | number) {
    console.log(errStatus, 'err')
    if ( errStatus === 400 ) {
      this.form.setErrors({ invalidLogin: true });
    }else{
      this.form.setErrors({ unknownError: true });
    }
  };

  public async onLogin(): Promise<void> {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

    if ( this.form.invalid ) return;

    const { email, password } = 
    this.form.getRawValue();

    const errorStatus = await 
    this.loginService.onLoginSubmit(email,password);

    if ( errorStatus ) {
      this.handleError(errorStatus)
    };
  };

}
