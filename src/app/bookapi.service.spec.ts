import { TestBed } from '@angular/core/testing';

import { BookapiService } from './bookapi.service';

describe('BookapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookapiService = TestBed.get(BookapiService);
    expect(service).toBeTruthy();
  });
});
