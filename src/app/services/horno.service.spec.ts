import { TestBed } from '@angular/core/testing';

import { HornoService } from './horno.service';

describe('HornoService', () => {
  let service: HornoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HornoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
