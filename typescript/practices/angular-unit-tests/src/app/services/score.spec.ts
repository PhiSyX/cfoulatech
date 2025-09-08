import { TestBed } from '@angular/core/testing';

import { Score } from './score';

describe('Score', () => {
	let service: Score;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(Score);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should be the score greater than 9', () => {
		expect(service.getScore()).toBe(0);

		service.add(3);
		service.add(2);
		expect(service.getScore()).not.toBeGreaterThan(9);

		service.add(3);
		service.add(2);
		service.add(3);
		expect(service.getScore()).toBeGreaterThan(9);
	});
});
