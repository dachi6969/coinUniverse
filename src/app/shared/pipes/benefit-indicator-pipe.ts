import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'benefitIndicator'
})
export class BenefitIndicatorPipe implements PipeTransform {

  transform(boughtPrice: number, priceNow: number): number {
    return +(priceNow - boughtPrice).toFixed(3);
  }

}
