import { TestBed } from '@angular/core/testing';

import { PackageListService } from './package-list.service';

describe('PackageListService', () => {
  let service: PackageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
