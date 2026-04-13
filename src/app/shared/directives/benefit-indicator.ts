import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[BenefitIndicator]'
})
export class BenefitIndicator implements AfterViewInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    const text = this.el.nativeElement.textContent;

    if ( text.includes('-') ) {
      this.renderer.addClass(this.el.nativeElement, 'has-dash')
    }
  }

}
