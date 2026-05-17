import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxAmount'
})
export class MaxAmountPipe implements PipeTransform {

  transform(price: number, userBalance: number): string {

    if (!price || price <= 0) {
      return '0';
    }

    const divided = userBalance / price;

    return divided < 1
      ? divided.toFixed(3)
      : Math.floor(divided).toString();
  }

}
