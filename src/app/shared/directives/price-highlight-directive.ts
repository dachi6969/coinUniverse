import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[priceHighlight]'
})
export class PriceHighlightDirective implements OnChanges, OnDestroy {
  
  private prev: number | null = null;
  private timeoutId: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  @Input() set priceHighlight(value: number | null | undefined) {
    if (value == null) return;

    if (this.prev === null) {
      this.prev = value;
      return;
    }

    if (value === this.prev) return;

    clearTimeout(this.timeoutId);

    const direction = value > this.prev ? 'up' : 'down';

    this.triggerFlash(direction);

    this.prev = value;
  }

  private triggerFlash(direction: 'up' | 'down') {
    const el = this.el.nativeElement;

    this.renderer.removeClass(el, 'flash-up');
    this.renderer.removeClass(el, 'flash-down');

    const className = direction === 'up' ? 'flash-up' : 'flash-down';

    this.renderer.addClass(el, className);

    this.timeoutId = setTimeout(() => {
      this.renderer.removeClass(el, className);
    }, 1500);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

}