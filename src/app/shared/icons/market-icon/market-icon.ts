import { Component, computed, input } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'market-icon',
  imports: [],
  templateUrl: './market-icon.html',
  styleUrl: './market-icon.css',
})
export class MarketIcon {
  size = input<number>(24);
  color = input<ColorVariant>('light');

  actualColor = computed(() => {
    return colors[this.color()];
  });
}
