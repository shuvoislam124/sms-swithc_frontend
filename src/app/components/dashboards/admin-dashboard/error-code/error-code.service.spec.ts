import { TestBed } from '@angular/core/testing';

import { ErrorCodeService } from './error-code.service';

describe('ErrorCodeService', () => {
  let service: ErrorCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
