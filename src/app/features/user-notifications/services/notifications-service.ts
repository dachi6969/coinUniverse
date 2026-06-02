import { inject, Injectable, signal } from '@angular/core';
import { UserNotifyService } from '../../../core/services/user-notifications/user-notify-service';
import { Notifications } from '../../../core/types/notifications-types';


@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  // Local UI States.
  public isNotificationOpen = signal<boolean>(false);
  public selectedMessage = signal< Notifications | null >(null);
  
  // Injected UI States.
  private readonly userNotifyService = inject(UserNotifyService);
  public readonly isLoading = this.userNotifyService.isLoading;
  public readonly notifications = this.userNotifyService.notifications;


  // METHODS.
  public open() {
    this.isNotificationOpen.set(true);
  };
  public close() {
    this.isNotificationOpen.set(false);
  };

  public deleteAllNotifications(): void {
    this.userNotifyService.deleteAllNotifications();
  };

  public openMessage(notifi: Notifications) {
    this.selectedMessage.set(notifi);
    this.isNotificationOpen.set(true);
  };

  public closeMessage(): void {
    this.isNotificationOpen.set(false);
  };

  public readNotification(msg: Notifications) {
    this.userNotifyService.readNotification(msg.id,msg.user_id);
  };

}
