import { TestBed } from '@angular/core/testing';

import { Temperature } from './temperature';

describe('Temperature', () => {
	let service: Temperature;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(Temperature);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should be increment until 250deg', () => {
		service.setMax(250);

		service.increment(245);
		expect(service.getDegrees()).toBeLessThan(service.getMax());

		service.increment(50);
		expect(service.getDegrees()).toBe(service.getMax())
	});
});
