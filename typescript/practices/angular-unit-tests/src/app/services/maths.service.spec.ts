import { TestBed } from '@angular/core/testing';

import { MathsService } from './maths.service';

describe('MathsService', () => {
  let service: MathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathsService);
  });

  it('should be able to add two numbers', () => {
    expect( service.add(4, 6) ).toBe(10);
  });
  it('should be able to multiplication two numbers', () => {
    expect( service.mul(2, 6) ).toBe(12);
  });

  it('should be able to divide two numbers', () => {
    expect( service.div(6, 2) ).toBe(3);
  });

  it('should not be able to divide two zero', () => {
    expect( () => service.div(6, 0) ).toThrowError("Expected a positive integer");
  });
});
