import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIcon } from "../../../../shared/icons/search-icon/search-icon";
import { UiButton } from "../../../../shared/components/ui-button/ui-button";
import { NotificationsSkeleton } from "../../components/notifications-skeleton/notifications-skeleton";
import { OpenNotification } from "../../components/open-notification/open-notification";
import { Notifications } from '../../../../core/types/notifications-types';
import { NotificationsService } from '../../services/notifications-service';

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

  public readonly searchVal = signal('');

  // Injected States.
  private readonly notifiService =  inject(NotificationsService);
  public readonly isLoading = this.notifiService.isLoading;
  private readonly notifications = this.notifiService.notifications;
  public readonly isNotificationOpen = this.notifiService.isNotificationOpen;
  public readonly selectedMessage = this.notifiService.selectedMessage;

  // Search Engine.
  public readonly currentNotifications = computed(() => {
    const search = this.searchVal().trim();
    const notif = this.notifications();

    if ( search && notif.length ) {
      const filtered = 
      notif.filter(not => not.title.includes(search));

      return filtered;
    }
    return notif;
  });

  // METHODS.
  public deleteAll(): void {
    this.notifiService.deleteAllNotifications();
  }

  public openMessage(n: Notifications) {
    this.notifiService.openMessage(n);
  };

  public closeMessage(): void {
    this.notifiService.closeMessage();
  };

  public onReadNotifi(msg: Notifications): void {
    this.notifiService.readNotification(msg);
  };

}
