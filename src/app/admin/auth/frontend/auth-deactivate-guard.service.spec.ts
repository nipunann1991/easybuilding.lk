import { TestBed } from '@angular/core/testing';

import { AuthDeactivateGuardService } from './auth-deactivate-guard.service';

describe('AuthDeactivateGuardService', () => {
  let service: AuthDeactivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDeactivateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
