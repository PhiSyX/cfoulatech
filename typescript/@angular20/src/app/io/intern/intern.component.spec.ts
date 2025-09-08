import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Intern } from './intern';

describe('Intern', () => {
  let component: Intern;
  let fixture: ComponentFixture<Intern>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Intern]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Intern);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
