import { TestBed } from '@angular/core/testing';

import { Product } from './product';

describe('Product', () => {
	let service: Product;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(Product);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});


	it('should be same initial state', () => {
		expect(service.getProducts()).toEqual([
			{ id: 1, name: 'Ordinateur', price: 999.99, stock: 5 },
			{ id: 2, name: 'Clavier', price: 49.99, stock: 10 },
			{ id: 3, name: 'Souris', price: 19.99, stock: 0 },
		]);
	});

	it('should be return a product', () => {
		expect(service.getProductById(1)).toEqual({
			id: 1,
			name: 'Ordinateur',
			price: 999.99,
			stock: 5,
		});
	});

	it('should be in list products', () => {
		expect(service.isinStock(1)).toBeTrue();
	});

	it('should not be in list products', () => {
		expect(service.isinStock(5)).toBeFalse();
	});

	it('should not be in list products', () => {
		expect(() => service.getProductById(4))
			.toThrowError("Le produit à l'ID 4 n'existe pas");
	});

	it('should be buy a product', () => {
		expect(service.getProductById(1)).toEqual({
			id: 1,
			name: 'Ordinateur',
			price: 999.99,
			stock: 5,
		});

		service.buyProduct(1);

		expect(service.getProductById(1)).toEqual({
			id: 1,
			name: 'Ordinateur',
			price: 999.99,
			stock: 4,
		});
	});

	it('should not buy a product', () => {
		service.buyProduct(5);
		expect(service.getProducts()).toEqual([
			{ id: 1, name: 'Ordinateur', price: 999.99, stock: 5 },
			{ id: 2, name: 'Clavier', price: 49.99, stock: 10 },
			{ id: 3, name: 'Souris', price: 19.99, stock: 0 },
		]);

		service.buyProduct(3);
		expect(service.getProducts()).toEqual([
			{ id: 1, name: 'Ordinateur', price: 999.99, stock: 5 },
			{ id: 2, name: 'Clavier', price: 49.99, stock: 10 },
			{ id: 3, name: 'Souris', price: 19.99, stock: 0 },
		]);
	});

	it('should be returns a total', () => {
		expect(service.getTotalStock()).toBeGreaterThan(5499);
	});
});
