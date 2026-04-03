import { Component, inject } from '@angular/core';
import { MenuIcon } from "../../../shared/icons/menu-icon/menu-icon";
import { DashboardSidebar } from "../dashboard-sidebar/dashboard-sidebar";
import { ProfileIcon } from "../../../shared/icons/profile-icon/profile-icon";
import { DashboardService } from '../services/dashboard-service';
import { DashboardSearch } from "../components/dashboard-search/dashboard-search";

@Component({
  selector: 'app-dashboard-header',
  imports: [MenuIcon, DashboardSidebar, ProfileIcon, DashboardSearch],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {

  private dashboardLayoutService = inject(DashboardService);
  public isDesktop = this.dashboardLayoutService.isDesktop;
  public isSidebarOpen = this.dashboardLayoutService.isSidebarOpen;


  open(): void {
    this.dashboardLayoutService.openSidebar();
  }
  close(): void {
    this.dashboardLayoutService.closeSidebar();
  }


}
