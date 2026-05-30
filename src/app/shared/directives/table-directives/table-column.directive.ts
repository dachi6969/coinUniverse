import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableColumn]',
  standalone: true
})
export class TableColumnDirective {
  name = input.required<string>({ alias: 'appTableColumn' });
  constructor(public templateRef: TemplateRef<any>) {}
}