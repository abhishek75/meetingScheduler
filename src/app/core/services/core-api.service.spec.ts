import { TestBed } from '@angular/core/testing';

import { CoreApiService } from './core-api.service';

describe('CoreApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreApiService = TestBed.get(CoreApiService);
    expect(service).toBeTruthy();
  });
});
