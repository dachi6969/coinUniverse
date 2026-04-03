import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'search-icon',
  imports: [],
  templateUrl: './search-icon.html',
  styleUrl: './search-icon.css',
})
export class SearchIcon {
  size = input<number>(24);
  color = input<ColorVariant>('dark');

  onClick = output();

  currentColor = computed(() => {
    return colors[this.color()];
  })

  handleClick() {
    this.onClick.emit();
  }
}
