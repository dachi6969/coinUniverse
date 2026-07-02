import { Component, inject } from '@angular/core';
import { DashboardSidebar } from "../dashboard-sidebar/dashboard-sidebar";
import { ProfileIcon } from "../../../shared/icons/profile-icon/profile-icon";
import { DashboardLayoutService } from '../services/dashboard-layout-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";

@Component({
  selector: 'app-dashboard-header',
  imports: [
    DashboardSidebar, 
    ProfileIcon, 
    CommonModule, 
    LogoIcon, 
    RouterLink
  ],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {

  private readonly dashboardLayoutService = inject(DashboardLayoutService);

  public readonly isDesktop = this.dashboardLayoutService.isDesktop;
  public readonly isSidebarOpen = this.dashboardLayoutService.isSidebarOpen;
  public readonly isUserLoggedIn = this.dashboardLayoutService.isUserLoggedIn;
  public readonly headerTitle$ = this.dashboardLayoutService.headerTitle$;


  // METHODS.
  public open(): void {
    this.dashboardLayoutService.openSidebar();
  }
  public close(): void {
    this.dashboardLayoutService.closeSidebar();
  }

  public navToProfile(): void {
    this.dashboardLayoutService.navToProfile();
  };

  public navToMainPage(): void {
    this.dashboardLayoutService.navToMainPage();
  };

  public logout(): void {
    this.dashboardLayoutService.logout();
  }

}
