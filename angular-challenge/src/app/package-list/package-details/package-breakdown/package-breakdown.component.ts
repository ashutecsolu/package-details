import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PackageBreakdown, RateColumn } from './package-breakdown';
import { PackageBreakdownService } from './package-breakdown.service';

@Component({
  selector: 'app-package-breakdown',
  templateUrl: './package-breakdown.component.html',
  styleUrls: ['./package-breakdown.component.css']
})
export class PackageBreakdownComponent implements OnInit {

  packageId = 0;
  lineItemList: PackageBreakdown[] = [];
  displayedColumns: string[] = ['reference', 'description', 'scope', 'quantity', 'units'];
  supplierHeader: string[] = ['1', '2', '3', '4', '5'];
  rateColumns: RateColumn[] = [];
  dataSource: MatTableDataSource<PackageBreakdown>;
  totalAmount: any = {};
  rateColor: any = {};

  constructor(private activeRoute: ActivatedRoute, private packageBreakdownService: PackageBreakdownService) { }

  ngOnInit(): void {
    this.packageId = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10);
    this.getLineItemList(this.packageId);
  }

  getLineItemList(id: number): void {
    this.packageBreakdownService.getLineItemList(id).subscribe( lineItems => {
      this.lineItemList = lineItems;
      this.setColors();
      this.lineItemList[0]?.suppliers.forEach((supplier, i) => {
        this.displayedColumns.push('unit rate' + i);
        this.displayedColumns.push('amount' + i);
        this.rateColumns.push({
          id: 'unit rate' + i,
          name: 'Unit Rate',
          supplier,
        });
        this.rateColumns.push({
          id: 'amount' + i,
          name: 'Amount',
          supplier,
        });
        const lastElement = this.supplierHeader[this.supplierHeader.length - 1];
        this.supplierHeader.push(supplier);
        this.supplierHeader.push((parseInt(lastElement, 10) + 1).toString());
      });
      this.calculateTotalAmount();
      this.dataSource = new MatTableDataSource(this.lineItemList);
    });

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  calculateTotalAmount(): void {
    this.lineItemList[0].unitRates.forEach(rate => {
      this.totalAmount[rate.supplier] = this.totalAmount[rate.supplier] ? this.totalAmount[rate.supplier] : 0;
      this.totalAmount[rate.supplier] = this.totalAmount[rate.supplier] + rate.amount;
    });
  }

  setColors(): void {
    this.lineItemList.forEach(item => {
      const unitRates = item.unitRates.filter(rate => rate.reference === item.reference);
      if (unitRates.length > 1) {
        const max = Math.max.apply(Math, unitRates.map(rate => rate.rate));
        const min = Math.min.apply(Math, unitRates.map(rate => rate.rate));
        item.unitRates.forEach(rate => {
          if (rate.rate === max) {
            this.rateColor[rate.rate] = 'red';
          }
          else if (rate.rate === min) {
            this.rateColor[rate.rate] = 'green';
          }
        });
      }
    });
  }
}
