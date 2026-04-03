import { Component, inject } from '@angular/core';
import { ChartIcon } from "../../../shared/icons/chart-icon/chart-icon";
import { DashboardIcon } from "../../../shared/icons/dashboard-icon/dashboard-icon";
import { MarketIcon } from "../../../shared/icons/market-icon/market-icon";
import { NotificationIcon } from "../../../shared/icons/notification-icon/notification-icon";
import { PortfolioIcon } from "../../../shared/icons/portfolio-icon/portfolio-icon";
import { SettingsIcon } from "../../../shared/icons/settings-icon/settings-icon";
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { DashboardService } from '../services/dashboard-service';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [DashboardIcon, MarketIcon, NotificationIcon, PortfolioIcon, ChartIcon, SettingsIcon, LogoIcon],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.css',
})
export class DashboardSidebar {

  private dashboardLayoutService = inject(DashboardService);
  public isDesktop = this.dashboardLayoutService.isDesktop;

}
