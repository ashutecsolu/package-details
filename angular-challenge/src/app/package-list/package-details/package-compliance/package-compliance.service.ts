import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid, BidComplianceValue, ComplianceField } from 'src/app/models';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { PackageCompliance, ComplianceBid } from './package-compliance';

@Injectable({
  providedIn: 'root'
})
export class PackageComplianceService {

  constructor(private http: HttpClient) { }

  getComplianceList(packageId: number): Observable<PackageCompliance[]> {
    return forkJoin([this.getComplianceFields(packageId),
      this.getBids(packageId),
      this.getComplianceBidValues()]
      ).pipe(
      map(([complianceFields, bids, complianceBids]) => {
        const suppliers = [];
        bids.forEach(bid => {
          suppliers.push(bid.supplier.name);
        });
        const packageComplianceFields: PackageCompliance[] = [];
        complianceFields.forEach(field => {
          packageComplianceFields.push({
            reference: field.reference,
            description: field.description,
            type: field.type,
            requirement: field.requirement,
            suppliers,
            complianceBids: complianceBids.map(cb => {
              let compliance: ComplianceBid;
              compliance = {
                reference: cb.compliance_field.reference,
                supplier: cb.bid.supplier.name,
                value: cb.value
              };
              return compliance;
            })
          });
        });
        return packageComplianceFields;
      }));
  }

  getComplianceFields(packageId: number): Observable<ComplianceField[]> {
    return this.http.get<ComplianceField[]>('api/compliance_fields').pipe(
      map( complianceFields => complianceFields.filter(c => c.package.id === packageId)));
  }

  getBids(packageId: number): Observable<Bid[]> {
    return this.http.get<Bid[]>('api/bids').pipe(
      map(bids => bids.filter(bid => bid.package.id === packageId)));
  }

  getComplianceBidValues(): Observable<BidComplianceValue[]> {
    return  this.http.get<BidComplianceValue[]>('api/bid_compliance_values');
  }
}
