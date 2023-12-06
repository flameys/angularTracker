import { TestBed } from '@angular/core/testing';

import { UitgaveService } from './uitgave.service';

describe('UitgaveService', () => {
  let service: UitgaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UitgaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
