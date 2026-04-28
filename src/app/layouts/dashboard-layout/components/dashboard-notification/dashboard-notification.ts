import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { Notifications } from '../../../../core/types/notifications-types';

@Component({
  selector: 'dashboard-notification',
  imports: [],
  templateUrl: './dashboard-notification.html',
  styleUrl: './dashboard-notification.css',
})
export class DashboardNotification implements OnInit, OnDestroy {

  public newNotification = input<Notifications | null>();
  public close = output();

  private timeoutId!: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => {
      this.close.emit();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  public closeNotification(): void {
    clearTimeout(this.timeoutId);
    this.close.emit();
  }


}
