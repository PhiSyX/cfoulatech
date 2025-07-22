import { TestBed } from '@angular/core/testing';

import { InternService } from './intern.service';

describe('StagiaireService', () => {
	let service: InternService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(InternService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
