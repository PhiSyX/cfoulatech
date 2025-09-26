import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ListeCommandesComponent,
} from './components/liste-commandes/liste-commandes.component';
import {
  FormulaireCommandeComponent,
} from './components/formulaire-commande/formulaire-commande.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListeCommandesComponent, FormulaireCommandeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent
{
}
