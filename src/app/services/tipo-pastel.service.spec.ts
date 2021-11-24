import { TestBed } from '@angular/core/testing';

import { TipoPastelService } from './tipo-pastel.service';

describe('TipoPastelService', () => {
  let service: TipoPastelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPastelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
