import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { UiButton } from "../../../../../shared/components/ui-button/ui-button";
import { AuthService } from '../../../../../core/services/auth-services/auth-service';
import { UserData } from '../../../../../core/types/user-types/user-data.types';
import { Router, RouterLink } from '@angular/router';
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from '../../../../../core/services/auth-services/validators';
import { SecurityService } from '../../../../../core/services/security-service/security-service';

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
  public isChecked = signal<boolean>(false);
  public pending = signal<boolean>(false);
  public readonly errMsg: string = 'Invalid email or password. Please try again.';

  private readonly authService = inject(AuthService);
  private readonly securityService = inject(SecurityService);

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // forms!
  public readonly form = this.fb.group({
    email: ['', EMAIL_VALIDATOR],
    password: ['', PASSWORD_VALIDATOR]
  }, { updateOn: 'submit' });

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('rememberedEmail');
  
    if (savedEmail) {  
      this.form.patchValue({ email: savedEmail });
      this.isChecked.set(true);
    }
  }

  private loginDone(): void {
    if ( this.isChecked() ) this.saveEmail();
    
    this.pending.set(false);
    this.form.reset();
    this.securityService.updateLoginHistory();
    this.navigateUser();
  };

  private saveEmail(): void {
    const { email } = this.form.getRawValue();
    localStorage.setItem('rememberedEmail',email ?? '');
  };
  private navigateUser(): void {
    const user = this.authService.userData();
    this.router.navigate(['/profile', user?.firstname ]);
  }

  public async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

    if ( this.form.invalid ) return;

    try {
      this.pending.set(true);
      const { email, password } = this.form.getRawValue() as UserData;
    
      const {error} = 
      await this.authService.signIn(email,password);
    
      if (error) {
        this.form.setErrors({ invalidLogin: true });
        return;
      } 
      this.loginDone(); 
    } 
    catch (err) {
      console.error(err);
      this.form.setErrors({ unknownError: true });
    } 
    finally {
      this.pending.set(false);
    }
  }

}
