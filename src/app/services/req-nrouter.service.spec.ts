import { TestBed } from '@angular/core/testing';

import { ReqNrouterService } from './req-nrouter.service';

describe('ReqNrouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqNrouterService = TestBed.get(ReqNrouterService);
    expect(service).toBeTruthy();
  });
});
