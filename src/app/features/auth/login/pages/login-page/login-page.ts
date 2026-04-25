import { Component, inject, signal } from '@angular/core';
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { UiButton } from "../../../../../shared/components/ui-button/ui-button";
import { AuthService } from '../../../../../core/services/auth-services/auth-service';
import { UserData } from '../../../../../core/types/user-data.types';
import { Router, RouterLink } from '@angular/router';
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from '../../../../../core/services/auth-services/validators';

@Component({
  selector: 'app-login-page',
  imports: [AuthInput, ReactiveFormsModule, LogoIcon, UiButton, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private rememberedEmail = signal<string | null>(null);

  public pending = signal<boolean>(false);
  public isChecked = signal<boolean>(false);

  private authService = inject(AuthService);

  private router = inject(Router);
  private fb = inject(FormBuilder);

  // forms!
  public form = this.fb.group({
    email: ['', EMAIL_VALIDATOR],
    password: ['', PASSWORD_VALIDATOR]
  }, { updateOn: 'submit' });

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

  private loginDone(): void {
    const user = this.authService.userData();

    if ( this.isChecked() ) {
      const email = this.form.getRawValue()['email'];

      localStorage.setItem('rememberedEmail',email ?? '');
    };

    this.form.reset();
    this.authService.updateLoginHistory()
    
    this.router.navigate(['/profile', user?.firstname ]);
}

  public async onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

    if ( this.form.invalid ) return;
    this.pending.set(true);

    const {email, password} = this.form.getRawValue() as UserData;

    const { data, error } = 
    await this.authService.supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      console.error("Supabase Error:", error.message); 
      
      this.form.setErrors({ invalidLogin: true });
      this.pending.set(false);
      return;
    }

    this.pending.set(false);
    this.loginDone();

  }

  public check(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
  
    if (checked) {
      this.isChecked.set(true);
      return;
    }

    this.isChecked.set(false);
  }

}
