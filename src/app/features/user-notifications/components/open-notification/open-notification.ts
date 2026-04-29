import { Component, inject, input, OnInit, output } from '@angular/core';
import { Notifications } from '../../../../core/types/notifications-types';
import { UserNotifyService } from '../../../../core/services/user-notifications/user-notify-service';

@Component({
  selector: 'open-notification',
  imports: [],
  templateUrl: './open-notification.html',
  styleUrl: './open-notification.css',
})
export class OpenNotification implements OnInit {
  public goBack = output();
  public message = input< Notifications | null >();

  private nService = inject(UserNotifyService);
  
  ngOnInit(): void {
    const isRead = this.message()?.is_read;

    if ( isRead ) return;
    this.readNotif();
  }

  public onBack(event: MouseEvent): void {
    event.stopPropagation(); 
    this.goBack.emit();
  };

  private readNotif(): void {
    const msg = this.message();
    if (!msg) return
    this.nService.readNotification(msg?.id, msg.user_id);
  }

}
