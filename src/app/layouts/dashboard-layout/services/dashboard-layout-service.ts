import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserNotifyService } from '../../../core/services/user-notifications/user-notify-service';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardLayoutService {
  // Local states.
  public isDesktop = signal<boolean>(false);
  public isAuthModalOpen = signal<boolean>(false);
  public isSidebarOpen = signal<boolean>(false);
  public isProfilePage = signal<boolean>(false);

  // Injectors.
  private readonly authService = inject(AuthService);
  private readonly userNotifyService = inject(UserNotifyService);
  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);
  
  public readonly notifications = this.userNotifyService.notifications;
  public readonly isUserLoggedIn = this.authService.isUserLoggedIn;
  

  constructor() {
    this.breakpointObserver.observe(['(max-width: 900px)'])
    .pipe( takeUntilDestroyed() )
    .subscribe((resp) => {
      this.isDesktop.set(!resp.matches);
      this.isSidebarOpen.set(false);
    });
  };

  public readonly headerTitle$ = 
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(t => t.url.slice(1)),
    startWith( this.router.url.slice(1) )
  );

  // Methods.
  public openSidebar(): void {
    this.isSidebarOpen.set(true);
  };

  public closeSidebar(): void {
    this.isSidebarOpen.set(false);
  };

  public onProfilePageLeave(): void {
    this.isProfilePage.set(false);
  };

  public navToProfile(): void {
    const userLoggedIn = this.isUserLoggedIn();

    userLoggedIn ? 
    this.router.navigate(['/profile']) :
    this.authService.openAuthModal();

  };

  public navToMainPage(): void {
    this.router.navigate(['/dashboard']);
  };

  public logout(): void {
    this.authService.logoutUser();
  };

}
