import { TestBed } from '@angular/core/testing';

import { PastelerosService } from './pasteleros.service';

describe('PastelerosService', () => {
  let service: PastelerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastelerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
