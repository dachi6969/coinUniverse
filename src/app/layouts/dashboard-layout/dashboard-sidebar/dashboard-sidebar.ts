import { Component, inject } from '@angular/core';
import { ChartIcon } from "../../../shared/icons/chart-icon/chart-icon";
import { DashboardIcon } from "../../../shared/icons/dashboard-icon/dashboard-icon";
import { MarketIcon } from "../../../shared/icons/market-icon/market-icon";
import { NotificationIcon } from "../../../shared/icons/notification-icon/notification-icon";
import { PortfolioIcon } from "../../../shared/icons/portfolio-icon/portfolio-icon";
import { SettingsIcon } from "../../../shared/icons/settings-icon/settings-icon";
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { DashboardLayoutService } from '../services/dashboard-layout-service';
import { NgComponentOutlet } from '@angular/common';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { Router } from '@angular/router';
import { LoginIcon } from "../../../shared/icons/login-icon/login-icon";

export const navigation = [
  { navTitle: 'Dashboard', icon: DashboardIcon },
  { navTitle: 'Portfolio', icon: PortfolioIcon },
  { navTitle: 'Markets', icon: MarketIcon },
  { navTitle: 'Charts', icon: ChartIcon },
  { navTitle: 'Notifications', icon: NotificationIcon },
  { navTitle: 'Settings', icon: SettingsIcon },
]

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [LogoIcon, NgComponentOutlet, LoginIcon],
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

  navToLoginPage(): void {
    this.router.navigate(['/auth/login']);
  };

}
