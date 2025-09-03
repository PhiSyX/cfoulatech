import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be have the username undefined', () => {
    expect(service.getUsername()).toBeUndefined();
  });

  it('should be have the username defined but null', () => {
    service.setUsername(null);
    expect(service.getUsername()).toBeDefined();
    expect(service.getUsername()).toBeNull();
  });

  it('should be have the username defined and non-null', () => {
    service.setUsername('Mike');
    expect(service.getUsername()).toBeDefined();
    expect(service.getUsername()).toBe("Mike");
  });

  it('should be have the age greater than the majority in France', () => {
    service.setUserAge(18);
    expect(service.getUserAge()).toBeGreaterThanOrEqual(18);
  });
});
