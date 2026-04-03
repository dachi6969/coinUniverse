import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'notification-icon',
  imports: [],
  templateUrl: './notification-icon.html',
  styleUrl: './notification-icon.css',
})
export class NotificationIcon {
  size = input<number>(24);
  color = input<ColorVariant>('dark');

  onClick = output();

  currentColor = computed(() => {
    return colors[this.color()];
  });

  handleClick() {
    this.onClick.emit();
  };
}
