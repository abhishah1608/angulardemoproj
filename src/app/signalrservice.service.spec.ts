import { TestBed } from '@angular/core/testing';

import { SignalrserviceService } from './signalrservice.service';

describe('SignalrserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignalrserviceService = TestBed.get(SignalrserviceService);
    expect(service).toBeTruthy();
  });
});
