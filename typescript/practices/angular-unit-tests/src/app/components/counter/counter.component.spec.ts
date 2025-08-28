import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { CounterComponent } from './counter.component';
import { DebugElement } from '@angular/core';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let nativeElement: HTMLElement;
  let fixture: ComponentFixture<CounterComponent>;

  /** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
  const ButtonClickEvents = {
    left: {button: 0},
    right: {button: 2},
  };
  /** Simulate element click. Defaults to mouse left-button click event. */
  function click(
    el: DebugElement | HTMLElement,
    eventObj: any = ButtonClickEvents.left,
  ): void {
    if (el instanceof HTMLElement) {
      el.click();
    } else {
      el.triggerEventHandler('click', eventObj);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement
    router = TestBed.inject(Router);
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

  it('should be zero on the h1 element', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toBe('0');
  });
});
