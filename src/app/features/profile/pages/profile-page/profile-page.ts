import { Component, inject, OnDestroy } from '@angular/core';
import { ProfileOverview } from "../../components/profile-overview/profile-overview";
import { LoginHistoryTable } from "../../components/login-history-table/login-history-table";
import { AccountSettings } from "../../components/account-settings/account-settings";
import { AccountDeletion } from "../../components/account-deletion/account-deletion";
import { DashboardLayoutService } from '../../../../layouts/dashboard-layout/services/dashboard-layout-service';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileOverview, LoginHistoryTable, AccountSettings, AccountDeletion],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnDestroy {

  private dashboardLayoutService = inject(DashboardLayoutService)

  ngOnDestroy(): void {
    this.dashboardLayoutService.isProfilePage.set(false)
  }
}
