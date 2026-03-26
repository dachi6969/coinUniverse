import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.css',
})
export class UiButton {

  public color = input<ColorVariant>('light');
  public variant = input<'outlined' | 'filled'>('outlined');
  public size = input<'small' | 'medium' | 'big'>('medium');
  public fullWidth = input<boolean>(false);
  public disabled = input<boolean>(false);

  public onClick = output();

  public selectedColor = computed(() => {
    return colors[this.color()];
  });


  handleClick(): void {
    this.onClick.emit();
  }

}
