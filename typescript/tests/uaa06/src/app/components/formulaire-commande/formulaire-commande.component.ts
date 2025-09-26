import { Component } from '@angular/core';
import { Commande } from '../../models/commande';
import { CommandeService } from '../../services/commande.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulaire-commande',
  imports: [
    FormsModule,
  ],
  templateUrl: './formulaire-commande.component.html',
  styleUrl: './formulaire-commande.component.css',
})
export class FormulaireCommandeComponent
{
  public commandeModel: Partial<Commande> = {};

  constructor(public commandeService: CommandeService)
  {
  }

  public ajouterCommande()
  {
    if (
      this.commandeModel.nomClient == null ||
      this.commandeModel.produit == null ||
      this.commandeModel.quantite == null ||
      this.commandeModel.prix == null
    ) {
      alert("Tous les champs du formulaire sont requis.");
      return;
    }

    this.commandeService.ajouterCommande(
      this.commandeModel.nomClient,
      this.commandeModel.produit,
      this.commandeModel.quantite,
      this.commandeModel.prix,
    );

    this.commandeModel = {};
  }
}
