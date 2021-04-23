import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplianceField, LineItem, Package, Section } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PackageListService {

  constructor(private http: HttpClient) { }

  getPackageList(): Promise<Package[]> {
    return new Promise<Package[]>((resolve, reject) => {
      this.http.get('api/packages').subscribe(async (res: Package[]) => {
        let lineItems = await this.getLineItems();
        let sections = await this.getSections();
        let complianceFields = await this.getComplianceFields();
        res = res.map((p: Package) => {
          p.line_items = lineItems.filter(item => p.id === item.package.id).map(item => item.id);
          p.sections = sections.filter(section => p.id === section.package.id).map(section => section.id);
          p.compliance_fields = complianceFields.filter(complianceField => p.id === complianceField.package.id).map(complianceField => complianceField.id);
          return p;
        });
        resolve(res);
      }, reject);
    });
  }

  getLineItems(): Promise<LineItem[]> {
    return new Promise<LineItem[]>((resolve, reject) => {
      this.http.get('api/line_items').subscribe((res: LineItem[]) => {
        resolve(res);
      }, reject);
    });
  }

  getSections(): Promise<Section[]> {
    return new Promise<Section[]>((resolve, reject) => {
      this.http.get('api/sections').subscribe((res: Section[]) => {
        resolve(res);
      }, reject);
    });
  }

  getComplianceFields(): Promise<ComplianceField[]> {
    return new Promise<ComplianceField[]>((resolve, reject) => {
      this.http.get('api/compliance_fields').subscribe((res: ComplianceField[]) => {
        resolve(res);
      }, reject);
    });
  }
}
