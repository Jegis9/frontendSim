import { TestBed } from '@angular/core/testing';

import { MerchadisingService } from './merchadising.service';

describe('MerchadisingService', () => {
  let service: MerchadisingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchadisingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
