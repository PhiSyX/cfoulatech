import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/commande';
import { TotalPipe } from '../../pipes/total.pipe';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-liste-commandes',
  imports: [
    NgForOf,
    TotalPipe,
  ],
  templateUrl: './liste-commandes.component.html',
  styleUrl: './liste-commandes.component.css',
})
export class ListeCommandesComponent implements OnInit
{
  public commandes: Array<Commande> = [];

  constructor(private commandeService: CommandeService)
  {
  }

  ngOnInit()
  {
    this.commandeService.ajouterCommande("Jean Aimable", "Laptop", 40, 999.99);
    this.commandeService.ajouterCommande("Julien Dunia", "Lunette 3D", 400, 1199.99);
    this.commandeService.ajouterCommande("Benoit Lepage", "Formation Scrum", 15, 229.99);

    this.commandeService.obtenirCommandes().subscribe((commandes) => {
      this.commandes = commandes;
    });
  }
}
