import { Component, computed, inject } from '@angular/core';
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { DashboardLayoutService } from '../services/dashboard-layout-service';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginIcon } from "../../../shared/icons/login-icon/login-icon";
import { navigation } from './sidebar-nav-list';
import { DisableIfDirective } from './directives/disable-if-directive';
import { HideOnScrollDirective } from "./directives/hide-on-scroll-directive";

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [
    LogoIcon,
    NgComponentOutlet,
    LoginIcon,
    RouterLink,
    DisableIfDirective,
    HideOnScrollDirective
],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.css',
})
export class DashboardSidebar {

  private readonly dashboardLayoutService = inject(DashboardLayoutService);

  public readonly isDesktop = this.dashboardLayoutService.isDesktop;
  private readonly notifications = this.dashboardLayoutService.notifications;
  public readonly isUserLoggedIn = this.dashboardLayoutService.isUserLoggedIn;

  public readonly navigation = navigation;

  public readonly unreadNotify = computed(() => {
    const notif = this.notifications();
    if ( !notif ) return 0;
    const notifQ = notif.filter(n => !n.is_read);
    return notifQ.length;
  });

  // METHODS.
  public disableState (title: string): boolean {
    if ( this.isUserLoggedIn() ) return false;
    return title === 'Notifications' || title === 'Portfolio' 
  }

  public closeSidebar(): void {
    this.dashboardLayoutService.closeSidebar();
  }

  public logout(): void {
    this.dashboardLayoutService.logout();
  }

}
