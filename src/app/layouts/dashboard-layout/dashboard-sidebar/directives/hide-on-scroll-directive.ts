import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[hideOnScroll]'
})
  export class HideOnScrollDirective {
    private lastScrollY = 0;
  
    constructor(private el: ElementRef) {}
  
    @HostListener('window:scroll')
    onScroll() {
      const currentScrollY = window.scrollY;
    
      if (currentScrollY <= 5) {
        this.el.nativeElement.classList.remove('hidden');
        this.lastScrollY = currentScrollY;
        return;
      }
    
      if (currentScrollY > this.lastScrollY) {
        this.el.nativeElement.classList.add('hidden');
      } else {
        this.el.nativeElement.classList.remove('hidden');
      }
    
      this.lastScrollY = currentScrollY;
    }
  }