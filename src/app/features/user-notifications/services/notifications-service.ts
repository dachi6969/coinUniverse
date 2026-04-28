import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class NotificationsService {

  public isNotificationOpen = signal<boolean>(false);

  public open() {
    this.isNotificationOpen.set(true);
  };
  public close() {
    this.isNotificationOpen.set(false);
  };
  
}
