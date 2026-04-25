import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { MenuIcon } from "../../../shared/icons/menu-icon/menu-icon";
import { DashboardSidebar } from "../dashboard-sidebar/dashboard-sidebar";
import { ProfileIcon } from "../../../shared/icons/profile-icon/profile-icon";
import { DashboardSearch } from "../components/dashboard-search/dashboard-search";
import { DashboardLayoutService } from '../services/dashboard-layout-service';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import {  NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  imports: [MenuIcon, DashboardSidebar, ProfileIcon, DashboardSearch, CommonModule],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader implements OnDestroy {

  private router = inject(Router);


  private dashboardLayoutService = inject(DashboardLayoutService);
  public isDesktop = this.dashboardLayoutService.isDesktop;
  public isSidebarOpen = this.dashboardLayoutService.isSidebarOpen;

  private authService = inject(AuthService);
  private user = this.authService.userData;

  public headerTitle = signal<string>('Dashboard');
  sub!: Subscription;

  constructor() {
    this.sub = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      const url = this.router.url;
      const formated = url.slice(1)
      this.headerTitle.set(formated);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public open(): void {
    this.dashboardLayoutService.openSidebar();
  }
  public close(): void {
    this.dashboardLayoutService.closeSidebar();
  }

  public navToProfile(): void {
    const user = this.user();

    user ? 
    this.router.navigate(['/profile']) :
    this.authService.openAuthModal();

  }


}
