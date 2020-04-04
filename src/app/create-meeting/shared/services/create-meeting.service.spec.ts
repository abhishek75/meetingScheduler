import { TestBed } from '@angular/core/testing';

import { CreateMeetingService } from './create-meeting.service';

describe('CreateMeetingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateMeetingService = TestBed.get(CreateMeetingService);
    expect(service).toBeTruthy();
  });
});
