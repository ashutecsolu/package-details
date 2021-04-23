import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, Bid, BidComplianceValue, ComplianceField } from 'src/app/models';
import { PackageCompliance, ComplianceBid } from './package-compliance';

@Injectable({
  providedIn: 'root'
})
export class PackageComplianceService {

  constructor(private http: HttpClient) { }

  async getComplianceList(packageId: number): Promise<PackageCompliance[]> {

    let complianceFields = await this.getComplianceFields(packageId);
    let bids = await this.getBids(packageId);
    let suppliers = [];
    bids.forEach(bid => {
      suppliers.push(bid.supplier.name);
    });
    let complianceBids = await this.getComplianceBidValues();
    
    return new Promise<PackageCompliance[]>((resolve, reject) => {
      let packageComplianceFields: PackageCompliance[] = [];
      complianceFields.forEach(field => {
        packageComplianceFields.push({
          reference: field.reference,
          description: field.description,
          type: field.type,
          requirement: field.requirement,
          suppliers: suppliers,
          complianceBids: complianceBids.map(cb => {
            let compliance: ComplianceBid;
            compliance = {
              reference: cb.compliance_field.reference,
              supplier: cb.bid.supplier.name,
              value: cb.value
            }
            return compliance;
          })
        })
      });
      resolve(packageComplianceFields);
    });
  }

  getComplianceFields(packageId: number): Promise<ComplianceField[]> {
    return new Promise<ComplianceField[]>((resolve, reject) => {
      this.http.get('api/compliance_fields').subscribe((res: ComplianceField[]) => {
        res = res.filter(c => c.package.id === packageId);
        resolve(res);
      }, reject);
    });
  }

  getBids(packageId: number): Promise<Bid[]> {
    return new Promise<Bid[]>((resolve, reject) => {
      this.http.get('api/bids').subscribe((res: Bid[]) => {
        res = res.filter(bid => bid.package.id === packageId);
        resolve(res);
      }, reject);
    });
  }
  
  getComplianceBidValues(): Promise<BidComplianceValue[]> {
    return new Promise<BidComplianceValue[]>((resolve, reject) => {
      this.http.get('api/bid_compliance_values').subscribe((res: BidComplianceValue[]) => {
        resolve(res);
      }, reject);
    });
  }
}
