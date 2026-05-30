import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-services/auth-service';
import { SecurityService } from '../../../../core/services/security-service/security-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isChecked = signal<boolean>(false);
  public pending = signal<boolean>(false);

  private readonly authService = inject(AuthService);
  private readonly securityService = inject(SecurityService);
  private readonly router = inject(Router);

  // METHODS.
  public checkEmail(): void {
    this.isChecked.set(true);
  }

  private loginDone(email: string): void {
    if ( this.isChecked() ) this.saveEmail(email);
    
    this.pending.set(false);
    this.securityService.updateLoginHistory();
    this.navToProfilePage();
  };

  private saveEmail(email: string): void {
    localStorage.setItem('rememberedEmail',email);
  };

  private navToProfilePage(): void {
    const user = this.authService.userData();
    if ( !user ) return;
    this.router.navigate(['/profile', user.firstname ]);
  };


  public async onLoginSubmit(email: string,pass: string)
  :Promise<number | void> 
  {
    try {
      this.pending.set(true);
      const {error} = 
      await this.authService.signIn(email,pass);
    
      if (error) {
        return error.status;
      } 
      this.loginDone(email); 
    } 
    catch (err) {
      console.error(err);
      throw err;
    } 
    finally {
      this.pending.set(false);
    }
  }

}
