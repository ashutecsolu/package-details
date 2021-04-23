import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Package, User, Account, Section, LineItem, ComplianceField, Bid, BidRate, BidComplianceValue} from './models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    const users: User[] = [
      { id: 1, email: 'ahmed@enzyme.com', username: 'Ahmed' },
      { id: 2, email: 'farma@fractal.com', username: 'Fatma' },
      { id: 3, email: 'farma@chemco.com', username: 'Steven' },
    ];
    const accounts: Account[] = [
      { id: 1, name: 'Enzyme LLC', description: 'Healthy food products', user: users[0] },
      { id: 2, name: 'Fractal Chemicals LLC', description: 'Supplier of advanced chemicals', user: users[1] },
      { id: 3, name: 'Chemical Co. ', description: 'Chemical and Industrial Supplies', user: users[2] },
    ];
    const packages: Package[] = [
      {id: 1, buyer: accounts[0], name: 'Chemical Supply', status: 'open'},
      {id: 2, buyer: accounts[0], name: 'More Chemical Supplies', status: 'open'},
    ];
    const sections: Section[] = [
      {id: 1, row_number: 1, package: packages[1], reference: 'S1', description: 'Basic Chemicals', scope: 'req'},
      {id: 2, row_number: 4, package: packages[1], reference: 'S2', description: 'Optional Chemicals', scope: 'opt'},
    ];
    const line_items: LineItem[] = [
      // first package
      {id: 1,  row_number: 1, package: packages[0], reference: 'L1', description: 'Dihydrogen monoxide', scope: 'req',
        quantity: 3.5, units: 'tons'},
      {id: 2,  row_number: 2, package: packages[0], reference: 'L2', description: 'Sodium Chloride', scope: 'req',
        quantity: 1.4,
      units: 'tons'},
      // second package
      {id: 3,  row_number: 2, package: packages[1], reference: 'L1', description: 'Dihydrogen monoxide', scope: 'req',
        quantity: 3.9,
      units: 'tons', section: sections[0]},
      {id: 4, row_number: 3, package: packages[1], reference: 'L2', description: 'Sodium Chloride', scope: 'req',
        quantity: 6.2, units: 'tons', section: sections[0]},
      {id: 5, row_number: 5, package: packages[1], reference: 'L3', description: 'Kryptonite', scope: 'req',
        quantity: 0.3, units: 'tons', section: sections[1]},
      {id: 6, row_number: 6, package: packages[1], reference: 'L4', description: 'Unobtainium', scope: 'opt',
        quantity: 0.2, units: 'tons', section: sections[1]},
    ];
    const compliance_fields: ComplianceField[] = [
      // second package
      {id: 1, row_number: 1, package: packages[1], reference: 'C1', description: 'Chemical Certification',
        requirement: 'req', type: 'chk'},
      {id: 2, row_number: 2, package: packages[1], reference: 'C2', description: 'Certification Level', requirement: 'opt',
        type: 'chk'},
    ];
    const bids: Bid[] = [
      {id: 1, package: packages[0], supplier: accounts[1]},
      {id: 2, package: packages[0], supplier: accounts[2]},
      {id: 3, package: packages[1], supplier: accounts[1]},
      {id: 4, package: packages[1], supplier: accounts[2]},
    ];
    const bid_rates: BidRate[] = [
      // first bid
      {id: 1, bid: bids[0], line_item: line_items[0], rate: 2545},
      {id: 2, bid: bids[0], line_item: line_items[1], rate: 845},
      // second bid
      {id: 3, bid: bids[1], line_item: line_items[0], rate: 5465},
      {id: 4, bid: bids[1], line_item: line_items[1], rate: 454},
      // third bid
      {id: 5, bid: bids[2], line_item: line_items[2], rate: 4458},
      {id: 6, bid: bids[2], line_item: line_items[3], rate: 665},
      {id: 7, bid: bids[2], line_item: line_items[4], rate: 5655},
      {id: 8, bid: bids[2], line_item: line_items[5], rate: 744},
      // fourth bid
      {id: 9, bid: bids[3], line_item: line_items[2], rate: 4487},
      {id: 10, bid: bids[3], line_item: line_items[3], rate: 445},
    ];
    const bid_compliance_values: BidComplianceValue[] = [
      // third bid
      {id: 1, bid: bids[2], compliance_field: compliance_fields[0], value: true},
      {id: 2, bid: bids[2], compliance_field: compliance_fields[1], value: 'CHE922'},
      // fourth bid
      {id: 3, bid: bids[3], compliance_field: compliance_fields[0], value: true},
    ];
    return {users, accounts, packages, sections, line_items, compliance_fields, bids, bid_rates, bid_compliance_values};
  }
  genId(objects: any[]): number {
    return objects.length > 0 ? Math.max(...objects.map(object => object.id)) + 1 : 1;
  }
}
