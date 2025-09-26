import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommandesComponent } from './liste-commandes.component';

describe('ListeCommandesComponent', () => {
  let component: ListeCommandesComponent;
  let fixture: ComponentFixture<ListeCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCommandesComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListeCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Vérifier que la liste affiche bien les commandes initiales', () => {
    expect(component.commandes).toEqual([
      {
        nomClient: "Jean Aimable",
        produit: "Laptop",
        quantite: 40,
        prix: 999.99,
      },
      {
        nomClient: "Julien Dunia",
        produit: "Lunette 3D",
        quantite: 400,
        prix: 1199.99,
      },
      {
        nomClient: "Benoit Lepage",
        produit: "Formation Scrum",
        quantite: 15,
        prix: 229.99,
      },
    ]);
  });
});
