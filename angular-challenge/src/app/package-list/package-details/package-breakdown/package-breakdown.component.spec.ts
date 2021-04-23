import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageBreakdownComponent } from './package-breakdown.component';

describe('PackageBreakdownComponent', () => {
  let component: PackageBreakdownComponent;
  let fixture: ComponentFixture<PackageBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageBreakdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
