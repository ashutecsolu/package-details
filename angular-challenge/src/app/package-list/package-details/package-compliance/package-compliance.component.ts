import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PackageCompliance } from './package-compliance';
import { PackageComplianceService } from './package-compliance.service';

@Component({
  selector: 'app-package-compliance',
  templateUrl: './package-compliance.component.html',
  styleUrls: ['./package-compliance.component.css']
})
export class PackageComplianceComponent implements OnInit {

  packageId = 0;
  complianceList: PackageCompliance[] = [];
  displayedColumns: string[] = ['reference', 'description', 'type', 'requirement'];
  dataSource: MatTableDataSource<PackageCompliance>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activeRoute: ActivatedRoute, private packageComplianceService: PackageComplianceService) { }

  ngOnInit(): void {
    this.packageId = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10);
    this.getComplianceList(this.packageId);
  }

  getComplianceList(id: number): void {
    this.packageComplianceService.getComplianceList(id).subscribe(complianceList => {
      this.complianceList = complianceList;
      this.complianceList[0]?.suppliers.forEach(supplier => {
      this.displayedColumns.push(supplier);
    });
      this.dataSource = new MatTableDataSource(this.complianceList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
