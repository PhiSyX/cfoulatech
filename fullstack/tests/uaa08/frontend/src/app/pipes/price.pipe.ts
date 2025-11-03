import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform
{
  transform(price: number, notation: "compact" | "standard" = "compact"): string
  {
    return Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      notation,
    }).format(price);
  }
}
