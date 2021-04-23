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

  packageId: number = 0;
  complianceList: PackageCompliance[] = [];
  displayedColumns: string[] = ['reference', 'description', 'type', 'requirement'];
  dataSource: MatTableDataSource<PackageCompliance>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activeRoute: ActivatedRoute, private packageComplianceService: PackageComplianceService) { }

  ngOnInit(): void {
    this.packageId = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.getComplianceList(this.packageId);
  }

  async getComplianceList(id: number) {
    this.complianceList = await this.packageComplianceService.getComplianceList(id);
    this.complianceList[0]?.suppliers.forEach(supplier => {
      this.displayedColumns.push(supplier);
    });
    this.dataSource = new MatTableDataSource(this.complianceList);
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
