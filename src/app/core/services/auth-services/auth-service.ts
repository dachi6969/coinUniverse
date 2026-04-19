import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../enviroments/supa-base-env';
import { Observable, tap } from 'rxjs';
import { CreateUserDTO, UserData } from '../../types/user-data.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isUserLoggedIn = signal<boolean>(false);
  public isUserRegistered = signal<boolean>(false);
  public isAuthModalOpen = signal<boolean>(false);

  private http = inject(HttpClient);

  constructor() {} // will set up user initial user status


  signUp(userData: CreateUserDTO): Observable<UserData> {
    return this.http.post<UserData>(environment.supabaseUrl, userData);
  };

  getUserData(userData: UserData): Observable<UserData[]> {

    const { email, password } = userData;

    const url = `${environment.supabaseUrl}?email=eq.${email}&password=eq.${password}`;

    return this.http.get<UserData[]>(url);
  }

  loginUser(): void {
    this.isUserLoggedIn.set(true);
  };

  logoutUser(): void {
    this.isUserLoggedIn.set(false);
  };

  registerUser(): void {
    this.isUserRegistered.set(true);
  };
  resetRegistration(): void {
    this.isUserRegistered.set(false);
  };

  openAuthModal(): void {
    this.isAuthModalOpen.set(true);
  };

  closeAuthModal(): void {
    this.isAuthModalOpen.set(false);
  };


}
