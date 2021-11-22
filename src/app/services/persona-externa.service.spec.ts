import { TestBed } from '@angular/core/testing';

import { PersonaExternaService } from './persona-externa.service';

describe('PersonaExternaService', () => {
  let service: PersonaExternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaExternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
