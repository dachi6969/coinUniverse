import { Component, computed, input } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'login-icon',
  imports: [],
  templateUrl: './login-icon.html',
  styleUrl: './login-icon.css',
})
export class LoginIcon {
  size = input<number>(24);
  color = input<ColorVariant>('light');

  actualColor = computed(() => {
    return colors[this.color()];
  });
}
