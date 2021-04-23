import { TestBed } from '@angular/core/testing';

import { PackageBreakdownService } from './package-breakdown.service';

describe('PackageBreakdownService', () => {
  let service: PackageBreakdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageBreakdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
