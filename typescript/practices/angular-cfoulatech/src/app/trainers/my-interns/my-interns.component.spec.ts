import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MyInternsComponent } from "./my-interns.component";

describe("MyInternsComponent", () => {
	let component: MyInternsComponent;
	let fixture: ComponentFixture<MyInternsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MyInternsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MyInternsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
