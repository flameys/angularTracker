import { TestBed } from '@angular/core/testing';

import { MaandService } from './maand.service';

describe('MaandService', () => {
  let service: MaandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
