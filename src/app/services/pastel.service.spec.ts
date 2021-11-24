import { TestBed } from '@angular/core/testing';

import { PastelService } from './pastel.service';

describe('PastelService', () => {
  let service: PastelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
