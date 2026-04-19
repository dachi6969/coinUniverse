import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth-services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'succesfully-register-modal',
  imports: [],
  templateUrl: './succesfully-register-modal.html',
  styleUrl: './succesfully-register-modal.css',
})
export class SuccesfullyRegisterModal {

  private router = inject(Router);

  private authService = inject(AuthService);
  public isUserResgistered = 
  this.authService.isUserRegistered;


  navToLoginPage(): void {
    this.router.navigate(['/auth/login']);
    this.authService.resetRegistration();
  }

}
