import { Component, inject } from '@angular/core';
import { MenuIcon } from "../../../shared/icons/menu-icon/menu-icon";
import { DashboardSidebar } from "../dashboard-sidebar/dashboard-sidebar";
import { ProfileIcon } from "../../../shared/icons/profile-icon/profile-icon";
import { DashboardSearch } from "../components/dashboard-search/dashboard-search";
import { DashboardLayoutService } from '../services/dashboard-layout-service';
import { AuthService } from '../../../core/services/auth-services/auth-service';

@Component({
  selector: 'app-dashboard-header',
  imports: [MenuIcon, DashboardSidebar, ProfileIcon, DashboardSearch],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {

  private dashboardLayoutService = inject(DashboardLayoutService);
  public isDesktop = this.dashboardLayoutService.isDesktop;
  public isSidebarOpen = this.dashboardLayoutService.isSidebarOpen;

  private authService = inject(AuthService);
  private isUserLoggedIn = this.authService.isUserLoggedIn;


  open(): void {
    this.dashboardLayoutService.openSidebar();
  }
  close(): void {
    this.dashboardLayoutService.closeSidebar();
  }

  navToProfile(): void {
    if ( !this.isUserLoggedIn() ) {
      this.authService.openAuthModal();
      return
    }
    // navigate on user's profile, logic will there
  }


}
