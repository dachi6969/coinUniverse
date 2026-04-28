import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIcon } from "../../../../shared/icons/search-icon/search-icon";
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { NotificationsSkeleton } from "../../components/notifications-skeleton/notifications-skeleton";
import { UserNotifyService } from '../../../../core/services/user-notifications/user-notify-service';
import { OpenNotification } from "../../components/open-notification/open-notification";
import { Notifications } from '../../../../core/types/notifications-types';

@Component({
  selector: 'notifications-page',
  imports: [
    CommonModule, 
    SearchIcon, 
    UiButton, 
    NotificationsSkeleton, 
    OpenNotification
  ],
  templateUrl: './notifications-page.html',
  styleUrl: './notifications-page.css',
})
export class NotificationsPage {

  public searchVal = signal('');

  private nService = inject(UserNotifyService);
  public isLoading = this.nService.isLoading;
  private notifications = this.nService.notifications;

  public readonly currentNotifi = computed(() => {
    const search = this.searchVal().trim();
    if ( search ) {
      const filtered = this.notifications().filter(not => {
        return not.title.includes(search)
      })
      return filtered;
    }
    return this.notifications();
  });

  public isNotificationOpen = signal<boolean>(false);
  public selectedMessage = signal< Notifications | null >(null);

  public deleteAll(): void {
    this.nService.deleteAllNotifications();
  }

  public openMessage(notifi: Notifications) {
    this.selectedMessage.set(notifi);
    this.isNotificationOpen.set(true);
  }

  public closeMessage(): void {
    this.isNotificationOpen.set(false);
  }

}
