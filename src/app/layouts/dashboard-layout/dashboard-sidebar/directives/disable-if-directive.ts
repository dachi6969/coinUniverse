import { Directive, ElementRef, HostListener, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[disableIf]'
})
export class DisableIfDirective implements OnChanges {

  @Input() disableIf: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges() {
    if (this.disableIf) {
      this.renderer.addClass(this.el.nativeElement, 'disabled');
      this.renderer.setAttribute(this.el.nativeElement, 'aria-disabled', 'true');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.el.nativeElement, 'aria-disabled');
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.disableIf) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}