import { Component, contentChildren, input, TemplateRef } from '@angular/core';
import { TableColumnDirective } from '../../../directives/table-directives/table-column.directive';
import { CommonModule } from '@angular/common';
import { TableSkeleton } from './table-skeleton/table-skeleton';


@Component({
  selector: 'data-table-component',
  imports: [CommonModule, TableSkeleton],
  templateUrl: './data-table-component.html',
  styleUrl: './data-table-component.css',
})
export class DataTableComponent {
  public readonly data = input<any[] | null>(null);
  public readonly columns = input<any[]>();

  private readonly customTemplates = 
  contentChildren(TableColumnDirective);

  getTemplate(key: string): TemplateRef<any> | null {
    const match = this.customTemplates().find(t => t.name() === key);
    return match ? match.templateRef : null;
  }
}
