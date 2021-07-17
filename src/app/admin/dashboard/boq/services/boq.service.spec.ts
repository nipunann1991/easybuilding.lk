import { TestBed } from '@angular/core/testing';

import { BoqService } from './boq.service';

describe('BoqService', () => {
  let service: BoqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
