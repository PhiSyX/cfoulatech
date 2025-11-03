import { Pipe, PipeTransform } from '@angular/core';

import { Adresse } from '~/models/adresse';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform
{
  transform(address: Adresse): string
  {
    return `${address.rue} n°${address.numero}, ${address.codePostal} ${address.ville}, ${address.pays}`;
  }
}
