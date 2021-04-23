import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bid, BidRate, LineItem } from 'src/app/models';
import { PackageBreakdown, UnitRate } from './package-breakdown';

@Injectable({
  providedIn: 'root'
})
export class PackageBreakdownService {

  constructor(private http: HttpClient) { }

  getLineItemList(packageId: number): Observable<PackageBreakdown[]> {
    return forkJoin([this.getLineItems(packageId),
      this.getBids(packageId),
      this.getBidRates()
    ]).pipe(
      map(([lineItems, bids, bidRates]) => {
        const bidIds = [];
        const suppliers = [];
        bids.forEach(bid => {
          suppliers.push(bid.supplier.name);
          bidIds.push(bid.id);
        });
        bidRates = bidRates.filter(rate => bidIds.includes(rate.bid.id));
        const packageBreakdownFields: PackageBreakdown[] = [];
        let sectionReference = '';
        for (const lineItem of lineItems ) {
          if (lineItem.section && lineItem.section.reference !== sectionReference) {
            sectionReference = lineItem.section.reference;
            packageBreakdownFields.push({
              reference: lineItem.section.reference,
              description: lineItem.section.description,
              scope: lineItem.section.scope,
              suppliers,
              unitRates: bidRates.map((bidRate: BidRate) => {
                let rate: UnitRate;
                rate = {
                  supplier: bidRate.bid.supplier.name,
                  rate: bidRate.rate,
                  amount: bidRate.line_item.quantity * bidRate.rate,
                  reference: bidRate.line_item.reference
                };
                return rate;
              })
            });
          }
          packageBreakdownFields.push({
            reference: lineItem.reference,
            description: lineItem.description,
            scope: lineItem.scope,
            quantity: lineItem.quantity,
            units: lineItem.units,
            suppliers,
            unitRates: bidRates.map((bidRate: BidRate) => {
              let rate: UnitRate;
              rate = {
                supplier: bidRate.bid.supplier.name,
                rate: bidRate.rate,
                amount: bidRate.line_item.quantity * bidRate.rate,
                reference: bidRate.line_item.reference
              };
              return rate;
            })
          });
        }
        return packageBreakdownFields;
      }));
  }

  getLineItems(packageId: number): Observable<LineItem[]> {
    return this.http.get<LineItem[]>('api/line_items').pipe(
      map(lineItems => lineItems.filter(li => li.package.id === packageId)));
  }

  getBids(packageId: number): Observable<Bid[]> {
    return  this.http.get<Bid[]>('api/bids').pipe(
      map( bids => bids.filter(bid => bid.package.id === packageId)));
  }

  getBidRates(): Observable<BidRate[]> {
    return  this.http.get<BidRate[]>('api/bid_rates');
  }
}
