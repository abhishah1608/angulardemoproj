import { TestBed } from '@angular/core/testing';

import { SessiontimeoutService } from './sessiontimeout.service';

describe('SessiontimeoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessiontimeoutService = TestBed.get(SessiontimeoutService);
    expect(service).toBeTruthy();
  });
});
