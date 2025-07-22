import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPerPageComponent } from './navigation-per-page.component';

describe('NavigationPerPageComponent', () => {
  let component: NavigationPerPageComponent;
  let fixture: ComponentFixture<NavigationPerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationPerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
