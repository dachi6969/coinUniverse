import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors'; 

@Component({
  selector: 'menu-icon',
  imports: [],
  templateUrl: './menu-icon.html',
  styleUrl: './menu-icon.css',
})
export class MenuIcon {
  size = input<number>(24);
  color = input<ColorVariant>('light');
  onClick = output();
  
  actualColor = computed(() => {
    return colors[this.color()];
  });

  handleClick() {
    this.onClick.emit();
  };
}
