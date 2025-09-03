import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be equal to the list', () => {
    expect(service.getProducts()).toEqual([
      { id: 1, name: "Poulet", price: 10 },
      { id: 2, name: "Banane", price: 2.5 },
    ])
  });
});
