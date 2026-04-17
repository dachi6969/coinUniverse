import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isUserLoggedIn = signal<boolean>(false);
  public isUserRegistered = signal<boolean>(false);
  public isAuthModalOpen = signal<boolean>(false);

  constructor() {} // will set up user initial user status

  loginUser(): void {
    this.isUserLoggedIn.set(true);
  };

  logoutUser(): void {
    this.isUserLoggedIn.set(false);
  };

  registerUser(): void {
    this.isUserRegistered.set(true);
  };

  openAuthModal(): void {
    this.isAuthModalOpen.set(true);
  };

  closeAuthModal(): void {
    this.isAuthModalOpen.set(false);
  };


}
