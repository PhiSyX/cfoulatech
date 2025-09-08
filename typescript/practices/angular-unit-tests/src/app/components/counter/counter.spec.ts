import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter } from './counter';
import { UnitTestElement } from '@angular/cdk/testing/testbed';

describe('Counter', () => {
	let component: Counter;
	let fixture: ComponentFixture<Counter>;
	let nativeElement: HTMLDivElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Counter],
		})
			.compileComponents();

		fixture = TestBed.createComponent(Counter);
		component = fixture.componentInstance;
		fixture.detectChanges();
		nativeElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be increment the counter', () => {
		expect(component.count).toBe(0);
		component.increment();
		expect(component.count).toBe(1);
	});

	it('should be decrement the counter', () => {
		expect(component.count).toBe(0);
		component.decrement();
		expect(component.count).toBe(-1);
	});

	it('should be zero on the h1 element', async () => {
		const $h1 = new UnitTestElement(nativeElement.querySelector('h1')!, () => Promise.resolve());
		expect(await $h1.text()).toBe('0');
	});
});
