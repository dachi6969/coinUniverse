import { Component, input, output } from '@angular/core';
import { Notifications } from '../../../../core/types/notifications-types';

@Component({
  selector: 'open-notification',
  imports: [],
  templateUrl: './open-notification.html',
  styleUrl: './open-notification.css',
})
export class OpenNotification {

  public goBack = output();
  public message = input< Notifications | null >();
 
  public onBack(event: MouseEvent): void {
    event.stopPropagation(); 
    this.goBack.emit();
  }

}
