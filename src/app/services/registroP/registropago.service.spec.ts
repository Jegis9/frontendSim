import { TestBed } from '@angular/core/testing';

import { RegistropagoService } from './registropago.service';

describe('RegistropagoService', () => {
  let service: RegistropagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistropagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
