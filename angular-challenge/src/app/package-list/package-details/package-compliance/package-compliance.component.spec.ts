import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageComplianceComponent } from './package-compliance.component';

describe('PackageComplianceComponent', () => {
  let component: PackageComplianceComponent;
  let fixture: ComponentFixture<PackageComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
