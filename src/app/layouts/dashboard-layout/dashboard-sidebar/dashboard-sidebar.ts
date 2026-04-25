import { Component, inject } from '@angular/core';
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { DashboardLayoutService } from '../services/dashboard-layout-service';
import { NgComponentOutlet } from '@angular/common';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { LoginIcon } from "../../../shared/icons/login-icon/login-icon";
import { navigation } from './sidebar-nav-list';


@Component({
  selector: 'app-dashboard-sidebar',
  imports: [LogoIcon, NgComponentOutlet, LoginIcon, RouterLink],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.css',
})
export class DashboardSidebar {

  private router = inject(Router);

  private dashboardLayoutService = inject(DashboardLayoutService);
  public isDesktop = this.dashboardLayoutService.isDesktop;

  private authService = inject(AuthService);
  public isUserLoggedIn = 
  this.authService.isUserLoggedIn;

  public navigation = navigation;

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
