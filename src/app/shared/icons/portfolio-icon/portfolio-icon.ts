import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'portfolio-icon',
  imports: [],
  templateUrl: './portfolio-icon.html',
  styleUrl: './portfolio-icon.css',
})
export class PortfolioIcon {
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
