import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid, BidRate, LineItem } from 'src/app/models';
import { PackageBreakdown, UnitRate } from './package-breakdown';

@Injectable({
  providedIn: 'root'
})
export class PackageBreakdownService {

  constructor(private http: HttpClient) { }

  async getLineItemList(packageId: number): Promise<PackageBreakdown[]> {
    let lineItems = await this.getLineItems(packageId);
    let bids = await this.getBids(packageId);
    let bidIds = [];
    let suppliers = [];

    bids.forEach(bid => {
      suppliers.push(bid.supplier.name);
      bidIds.push(bid.id);
    });

    let bidRates = await this.getBidRates();
    bidRates = bidRates.filter(rate => bidIds.includes(rate.bid.id));

    return new Promise<PackageBreakdown[]>((resolve, reject) => {
      let packageBreakdownFields: PackageBreakdown[] = [];
      let sectionReference: string = '';
      for (let i = 0; i < lineItems.length; i++) {
        if (lineItems[i].section && lineItems[i].section.reference != sectionReference) {
          sectionReference = lineItems[i].section.reference;
          packageBreakdownFields.push({
            reference: lineItems[i].section.reference,
            description: lineItems[i].section.description,
            scope: lineItems[i].section.scope,
            suppliers: suppliers,
            unitRates: bidRates.map((bidRate: BidRate) => {
              let rate: UnitRate;
              rate = {
                supplier: bidRate.bid.supplier.name,
                rate: bidRate.rate,
                amount: bidRate.line_item.quantity * bidRate.rate,
                reference: bidRate.line_item.reference
              }
              return rate;
            })
          });
        }
        packageBreakdownFields.push({
          reference: lineItems[i].reference,
          description: lineItems[i].description,
          scope: lineItems[i].scope,
          quantity: lineItems[i].quantity,
          units: lineItems[i].units,
          suppliers: suppliers,
          unitRates: bidRates.map((bidRate: BidRate) => {
            let rate: UnitRate;
            rate = {
              supplier: bidRate.bid.supplier.name,
              rate: bidRate.rate,
              amount: bidRate.line_item.quantity * bidRate.rate,
              reference: bidRate.line_item.reference
            }
            return rate;
          })
        })
      }
      resolve(packageBreakdownFields);
    });
  }

  getLineItems(packageId: number): Promise<LineItem[]> {
    return new Promise<LineItem[]>((resolve, reject) => {
      this.http.get('api/line_items').subscribe(async (res: LineItem[]) => {
        res = res.filter(li => li.package.id === packageId);
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

  getBidRates(): Promise<BidRate[]> {
    return new Promise<BidRate[]>((resolve, reject) => {
      this.http.get('api/bid_rates').subscribe((res: BidRate[]) => {
        resolve(res);
      }, reject);
    });
  }
}
