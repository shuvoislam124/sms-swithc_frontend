import { TestBed } from '@angular/core/testing';

import { ScheduledServiceService } from './scheduled-service.service';

describe('ScheduledServiceService', () => {
  let service: ScheduledServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
