import { Component, computed, input } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'dashboard-icon',
  imports: [],
  templateUrl: './dashboard-icon.html',
  styleUrl: './dashboard-icon.css',
})
export class DashboardIcon {
  size = input<number>(24);
  color = input<ColorVariant>('light');

  actualColor = computed(() => {
    return colors[this.color()];
  });
}
