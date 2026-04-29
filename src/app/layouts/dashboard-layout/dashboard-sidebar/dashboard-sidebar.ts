import { Component, inject } from '@angular/core';
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { DashboardLayoutService } from '../services/dashboard-layout-service';
import { NgComponentOutlet } from '@angular/common';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { LoginIcon } from "../../../shared/icons/login-icon/login-icon";
import { navigation } from './sidebar-nav-list';
import { DisableIfDirective } from '../../../shared/directives/disable-if-directive';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [
    LogoIcon, 
    NgComponentOutlet, 
    LoginIcon, 
    RouterLink, 
    DisableIfDirective
  ],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.css',
})
export class DashboardSidebar {
  private readonly router = inject(Router);

  private readonly dashboardLayoutService = inject(DashboardLayoutService);
  public readonly isDesktop = this.dashboardLayoutService.isDesktop;

  private readonly authService = inject(AuthService);
  public readonly isUserLoggedIn = 
  this.authService.isUserLoggedIn;

  public readonly navigation = navigation;

  public closeSidebar(): void {
    this.dashboardLayoutService.closeSidebar();
  }

  public navToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  };

  public logOut(): void {
    this.authService.logoutUser();
    this.closeSidebar();
  }

}
