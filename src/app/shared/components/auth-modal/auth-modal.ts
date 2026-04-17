import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  imports: [],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css',
})
export class AuthModal implements OnDestroy {

  private router = inject(Router);
  private authService = inject(AuthService);

  public isAuthModalOpen = 
  this.authService.isAuthModalOpen;

  public isUserLoggedIn = 
  this.authService.isUserLoggedIn;

  ngOnDestroy(): void {
    this.close();
  };

  close(): void {
    this.authService.closeAuthModal();
  }

  navToLoginPage(): void {
    this.router.navigate(['/auth/login'])
  }

}
