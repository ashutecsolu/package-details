import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComplianceField, LineItem, Package, Section } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PackageListService {

  constructor(private http: HttpClient) { }

  getPackageList(): Observable<Package[]> {
    return forkJoin([this.getPackages(),
      this.getLineItems(),
      this.getSections(),
      this.getComplianceFields()]).pipe(
        map(([packages, lineItems, sections, complianceFields]) => {
          return packages.map((p: Package) => {
            p.line_items = lineItems.filter(item => p.id === item.package.id).map(item => item.id);
            p.sections = sections.filter(section => p.id === section.package.id).map(section => section.id);
            p.compliance_fields = complianceFields.
            filter(complianceField => p.id === complianceField.package.id).map(complianceField => complianceField.id);
            return p;
        });
      }));
  }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>('api/packages');
  }

  getLineItems(): Observable<LineItem[]> {
    return this.http.get<LineItem[]>('api/line_items');
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>('api/sections');
  }

  getComplianceFields(): Observable<ComplianceField[]> {
    return this.http.get<ComplianceField[]>('api/compliance_fields');
  }
}
