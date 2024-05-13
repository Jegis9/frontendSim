import { TestBed } from '@angular/core/testing';

import { AddPagoService } from './add-pago.service';

describe('AddPagoService', () => {
  let service: AddPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
