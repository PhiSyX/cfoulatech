import { TestBed } from '@angular/core/testing';

import { TemperatureService } from './temperature.service';

describe('TemperatureService', () => {
  let service: TemperatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureService);
  });

  it('should be increment until 250deg', () => {
    service.setMax(250);

    service.increment(245);
    expect(service.getDegrees()).toBeLessThan(service.getMax());

    service.increment(50);
    expect(service.getDegrees()).toBe(service.getMax())
  });
});
