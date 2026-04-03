import { Component, computed, input } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'chart-icon',
  imports: [],
  templateUrl: './chart-icon.html',
  styleUrl: './chart-icon.css',
})
export class ChartIcon {
  size = input<number>(24);
  color = input<ColorVariant>('light');

  actualColor = computed(() => {
    return colors[this.color()];
  });
}
