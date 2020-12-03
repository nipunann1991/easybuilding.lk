import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToDecimal'
})
export class RoundToDecimalPipe implements PipeTransform {

  transform(value: any, precision: number): any {
    
    console.log(value, precision)
    var multiplier = Math.pow(10, precision || 0);
    return (Math.round(value * multiplier) / multiplier).toFixed(precision); 
    
  }

}
