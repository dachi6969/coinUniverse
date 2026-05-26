import { Component, inject, OnDestroy } from '@angular/core';
import { ProfileOverview } from "../../components/profile-overview/profile-overview";
import { LoginHistoryTable } from "../../components/login-history-table/login-history-table";
import { AccountSettings } from "../../components/account-settings/account-settings";
import { AccountDeletion } from "../../components/account-deletion/account-deletion";
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileOverview, 
    LoginHistoryTable, 
    AccountSettings, 
    AccountDeletion
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnDestroy {
  private readonly profileService = inject(ProfileService);

  public readonly pending = this.profileService.pending;

  public readonly loginHistory = 
  this.profileService.loginHistory;

  public readonly user = this.profileService.user;
  public readonly userStatus = this.profileService.userStatus;

  ngOnDestroy(): void {
    this.profileService.onProfileLeave();
  };

  public onDeleteAccount(): void{
    this.profileService.onDeleteAccount();
  };
}
