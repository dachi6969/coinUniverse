import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'profile-icon',
  imports: [],
  templateUrl: './profile-icon.html',
  styleUrl: './profile-icon.css',
})
export class ProfileIcon {
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
