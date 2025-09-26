import { Pipe, PipeTransform } from '@angular/core';
import { Commande } from '../models/commande';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform
{
  transform(commande: Omit<Commande, "nomClient" | "produit">): string
  {
    const montant = commande.quantite * commande.prix;
    return `${montant} €`;
  }
}
