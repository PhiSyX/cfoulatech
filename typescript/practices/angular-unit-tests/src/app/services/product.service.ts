import { Injectable } from "@angular/core";

import type { Product as ProductModel } from "../models/product";

@Injectable({
	providedIn: "root",
})
export class ProductService
{
	private products: Array<ProductModel> = [
		{ id: 1, name: "Ordinateur", price: 999.99, stock: 5 },
		{ id: 2, name: "Clavier", price: 49.99, stock: 10 },
		{ id: 3, name: "Souris", price: 19.99, stock: 0 },
	];

	public getProducts(): Readonly<Array<ProductModel>>
	{
		return Object.freeze([...this.products]);
	}

	public getMutProducts(): Array<ProductModel>
	{
		return this.products;
	}

	public getProductById(id: number): Readonly<ProductModel>
	{
		const product = this.getProducts().find((p) => p.id === id);
		if (product === undefined) {
			throw new Error(`Le produit à l'ID ${id} n'existe pas`);
		}
		return Object.freeze({ ...product });
	}

	private getMutProductById(id: number): ProductModel
	{
		const product = this.getMutProducts().find((p) => p.id === id);
		if (product === undefined) {
			throw new Error(`Le produit à l'ID ${id} n'existe pas`);
		}
		return product;
	}

	public isinStock(id: number): boolean
	{
		try {
			const product = this.getProductById(id);
			return product.stock > 0;
		} catch {
			return false;
		}
	}

	public buyProduct(id: number): void
	{
		try {
			const product = this.getMutProductById(id);

			if (product.stock <= 0) {
				return;
			}

			product.stock -= 1;
		} catch {
			return;
		}
	}

	public getTotalStock(): number
	{
		return this.products.reduce((total, p) => total + p.price * p.stock, 0);
	}
}
