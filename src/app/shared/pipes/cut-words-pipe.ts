import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutWords'
})
export class CutWordsPipe implements PipeTransform {

  transform(value: string, limit: number = 10, ellipsis: string = '...'): string {
    if (!value) return '';

    const words = value.trim().split(/\s+/);

    if (words.length <= limit) {
      return value;
    }

    return words.slice(0, limit).join(' ') + ellipsis;
  }

}
