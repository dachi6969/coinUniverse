import { Component, computed, input } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'logo-icon',
  imports: [],
  templateUrl: './logo-icon.html',
  styleUrl: './logo-icon.css',
})
export class LogoIcon {
  size = input<number>(24);
  color = input<ColorVariant>('light');

  actualColor = computed(() => {
    return colors[this.color()];
  });
}
