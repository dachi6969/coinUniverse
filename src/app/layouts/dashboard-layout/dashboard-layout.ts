import { Component, inject } from '@angular/core';
import {  RouterOutlet } from "@angular/router";
import { DashboardHeader } from "./dashboard-header/dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar/dashboard-sidebar";
import { AuthModal } from "../../shared/components/auth-modal/auth-modal";
import { DashboardLayoutService } from './services/dashboard-layout-service';
import { DashboardFooter } from "./dashboard-footer/dashboard-footer";


@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, DashboardHeader, DashboardSidebar, AuthModal, DashboardFooter],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

  private dashboardLayoutService = inject(DashboardLayoutService);

  public isProfilePage = 
  this.dashboardLayoutService.isProfilePage;

  public isDesktop =
  this.dashboardLayoutService.isDesktop;

}
