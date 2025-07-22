import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationGlobalComponent } from './navigation-global.component';

describe('NavigationGlobalComponent', () => {
  let component: NavigationGlobalComponent;
  let fixture: ComponentFixture<NavigationGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
