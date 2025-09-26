import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCommandeComponent } from './formulaire-commande.component';

describe('FormulaireCommandeComponent', () => {
  let component: FormulaireCommandeComponent;
  let fixture: ComponentFixture<FormulaireCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireCommandeComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormulaireCommandeComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('Vérifier que soumettre le formulaire appelle bien ajouterCommande() du service', () => {
    component.commandeModel = {};
    component.ajouterCommande();
    expect(component.commandeService.compterCommandes()).toBe(0);
  });

  it('Vérifier que soumettre le formulaire appelle bien ajouterCommande() du service', () => {
    component.commandeModel = {
      nomClient: "Mike",
      produit: "Mac Book",
      quantite: 3,
      prix: 1200,
    };

    component.ajouterCommande();

    expect(component.commandeService.compterCommandes()).toBe(1);
  });
});
