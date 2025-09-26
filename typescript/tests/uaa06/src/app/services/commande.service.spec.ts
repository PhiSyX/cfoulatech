import { TestBed } from '@angular/core/testing';

import { CommandeService } from './commande.service';

describe('CommandeService', () => {
  let service: CommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(CommandeService);
    service.ajouterCommande("Jean Aimable", "Laptop", 40, 999.99);
    service.ajouterCommande("Julien Dunia", "Lunette 3D", 400, 1199.99);
    service.ajouterCommande("Benoit Lepage", "Formation Scrum", 15, 229.99);
  });

  it('Vérifier que la liste initiale contient au moins une commande', (done) => {
    service.obtenirCommandes().subscribe((commandes) => {
      expect(commandes).toContain({
        nomClient: "Jean Aimable",
        produit: "Laptop",
        quantite: 40,
        prix: 999.99,
      });

      done();
    });
  });

  it("Vérifier qu'une commande est ajoutée avec ajouterCommande()", () => {
    service.ajouterCommande("Mike", "Mac Book", 1, 1000.99);

    service.obtenirCommandes().subscribe((commandes) => {
      expect(commandes).toContain({
        nomClient: "Mike",
        produit: "Mac Book",
        quantite: 1,
        prix: 1000.99,
      });
    });
  });

  it("Vérifier que compterCommandes retourne le bon nombre", () => {
    // Il y a déjà 3 commandes à chaque création de tests
    // +1 avec celui ci-bas
    service.ajouterCommande("Mike", "Mac Book", 1, 1000.99);
    expect(service.compterCommandes()).toBe(4);
  });
});
