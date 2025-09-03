import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService
{
  private products = [
    { id: 1, name: "Poulet", price: 10 },
    { id: 2, name: "Banane", price: 2.5 },
  ];

  getProducts()
  {
    return this.products;
  }
}
