import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber'
})
export class AbbreviateNumberPipe implements PipeTransform {
  
  transform(value: number): string {
    if (!value && value !== 0) return '';
    
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(("" + value).length / 3);
    
    let shortValue: any = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(3));
    
    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(2);
    }
    
    return shortValue + suffixes[suffixNum];
  }

}
