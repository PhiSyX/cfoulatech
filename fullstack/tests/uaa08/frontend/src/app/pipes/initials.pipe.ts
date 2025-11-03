import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform
{
  transform(nomComplet: string): unknown
  {
    const [prenom, nom] = nomComplet.split(' ')
    return `${prenom.at(0)}. ${nom.at(0)}.`;
  }
}
