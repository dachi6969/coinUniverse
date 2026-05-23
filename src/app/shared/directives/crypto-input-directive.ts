import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCryptoInput]',
  standalone: true
})
export class CryptoInputDirective {
  @Input() maxAmount: number = Infinity;
  @Input() decimals: number = 3;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private ngControl: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement) return;

    let processed = inputElement.value;
    if (!processed) return;

    if (processed.includes('.')) {
      const [whole, decimal] = processed.split('.');
      if (decimal.length > this.decimals) {
        processed = `${whole}.${decimal.slice(0, this.decimals)}`;
      }
    }

    if (+processed > this.maxAmount) {
      processed = this.maxAmount.toFixed(this.decimals);
    }

    this.el.nativeElement.value = processed;

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(processed, { emitEvent: false });
    }
  }
}