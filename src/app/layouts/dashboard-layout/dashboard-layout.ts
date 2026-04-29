import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { DashboardHeader } from "./dashboard-header/dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar/dashboard-sidebar";
import { AuthModal } from "../../shared/components/auth-modal/auth-modal";
import { DashboardLayoutService } from './services/dashboard-layout-service';
import { DashboardFooter } from "./dashboard-footer/dashboard-footer";
import { DashboardNotification } from "./components/dashboard-notification/dashboard-notification";
import { UserNotifyService } from '../../core/services/user-notifications/user-notify-service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet, 
    DashboardHeader, 
    DashboardSidebar, 
    AuthModal, 
    DashboardFooter, 
    DashboardNotification
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

  private readonly dashboardLayoutService = inject(DashboardLayoutService);
  private readonly nService = inject(UserNotifyService)

  public readonly newNotifi = 
  this.nService.isNewNotification;

  public readonly isProfilePage = 
  this.dashboardLayoutService.isProfilePage;

  public readonly isDesktop =
  this.dashboardLayoutService.isDesktop;

  close() {
    this.nService.isNewNotification.set(null);
  }

}
