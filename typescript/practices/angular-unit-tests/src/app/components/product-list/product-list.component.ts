import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { PricePipe } from '../../pipes/price-pipe';

@Component({
	selector: 'app-product-list',
	imports: [
		PricePipe,
	],
	templateUrl: './product-list.component.html',
	styleUrl: './product-list.component.css',
})
export class ProductListComponent
{
	public products: Readonly<Array<Product>> = [];

	constructor(
		private productService: ProductService,
	)
	{
		this.products = this.productService.getProducts();
	}

	buy(product: Product): void
	{
		this.productService.buyProduct(product.id);
	}
}
