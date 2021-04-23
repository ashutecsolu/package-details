import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Package } from '../models';
import { PackageListService } from './package-list.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  packageList: Package[] = [];
  displayedColumns: string[] = ['name', 'status', 'buyer', 'line_items', 'sections', 'compliance_fields'];
  dataSource: MatTableDataSource<Package>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private packageListService: PackageListService) { }

  ngOnInit(): void {
    this.getPackageList();
  }

  async getPackageList() {
    this.packageList = await this.packageListService.getPackageList();
    this.dataSource = new MatTableDataSource(this.packageList);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}