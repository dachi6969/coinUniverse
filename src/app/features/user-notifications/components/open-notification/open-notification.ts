import { Component, input, OnInit, output } from '@angular/core';
import { Notifications } from '../../../../core/types/notifications-types';

@Component({
  selector: 'open-notification',
  imports: [],
  templateUrl: './open-notification.html',
  styleUrl: './open-notification.css',
})
export class OpenNotification implements OnInit {
  public readonly message = input.required<Notifications | null>();
  public readonly goBack = output();
  public readonly readNotifi = output<Notifications>();
  
  ngOnInit() {
    const message = this.message();
    if ( !message ) return;
    this.readNotifi.emit(message);
  }

  public onBack(event: MouseEvent): void {
    event.stopPropagation(); 
    this.goBack.emit();
  };

}
