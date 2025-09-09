import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
	let component: ProductListComponent;
	let fixture: ComponentFixture<ProductListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProductListComponent],
		})
			.compileComponents();

		fixture = TestBed.createComponent(ProductListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should disable the button when the stock is 0', () => {
		// 1st
		const $buttons = fixture.debugElement.queryAll(By.css('button'));
		const zeroProductIdx = component.products.findIndex(p => p.stock === 0);
		expect($buttons[zeroProductIdx].nativeElement.disabled).toBeTrue();

		// 2nd
		fixture.autoDetectChanges();

		const firstProduct = component.products[0];
		const firstProductIdx = 0;
		expect($buttons[firstProductIdx].nativeElement.disabled).toBeFalse();

		for (let i = firstProduct.stock - 1; i > 0; i--) {
			$buttons[firstProductIdx].nativeElement.click();
			expect($buttons[firstProductIdx].nativeElement.disabled).toBeFalse();
		}

		$buttons[firstProductIdx].nativeElement.click();
		expect($buttons[firstProductIdx].nativeElement.disabled).toBeTrue();
	});

	it('should decrement the stock when the product is purchased', () => {
		const product = component.products[0];
		const initialStock = product.stock;

		component.buy(product);

		expect(product.stock).toBeGreaterThanOrEqual(0);
		expect(product.stock).toBe(initialStock - 1);
	});
});
