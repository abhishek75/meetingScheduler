import { TestBed } from '@angular/core/testing';
import { HomeApiService } from './home-api.service';

describe('DashboardApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeApiService = TestBed.get(HomeApiService);
    expect(service).toBeTruthy();
  });
});
