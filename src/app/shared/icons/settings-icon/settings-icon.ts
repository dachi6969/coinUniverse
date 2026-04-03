import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'settings-icon',
  imports: [],
  templateUrl: './settings-icon.html',
  styleUrl: './settings-icon.css',
})
export class SettingsIcon {
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
