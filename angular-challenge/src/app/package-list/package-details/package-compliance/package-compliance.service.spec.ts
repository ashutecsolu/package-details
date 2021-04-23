import { TestBed } from '@angular/core/testing';

import { PackageComplianceService } from './package-compliance.service';

describe('PackageComplianceService', () => {
  let service: PackageComplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageComplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
