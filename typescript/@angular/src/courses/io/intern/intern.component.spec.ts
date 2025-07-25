import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternComponent } from './intern.component';

describe('OutputComponent', () => {
	let component: InternComponent;
	let fixture: ComponentFixture<InternComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InternComponent],
		})
			.compileComponents();

		fixture = TestBed.createComponent(InternComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
