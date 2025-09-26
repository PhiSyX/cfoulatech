import { Injectable } from '@angular/core';
import type { Commande } from '../models/commande';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService
{
  public commandes: BehaviorSubject<Array<Commande>> = new BehaviorSubject<Array<Commande>>([]);

  constructor()
  {
  }

  public obtenirCommandes()
  {
    return this.commandes.asObservable();
  }

  public ajouterCommande(
    nomClient: Commande["nomClient"],
    produit: Commande["produit"],
    quantite: Commande["quantite"],
    prix: Commande["prix"],
  ): void
  {
    this.commandes.next([
      ...this.commandes.value,
      {
        nomClient,
        produit,
        quantite,
        prix,
      },
    ]);
  }

  public compterCommandes(): number
  {
    return this.commandes.value.length;
  }
}
