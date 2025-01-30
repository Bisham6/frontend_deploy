import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from '@ag-grid-community/core';
import { ApiService } from '../api.service';
import 'ag-grid-enterprise';
import { AgGridAngular } from '@ag-grid-community/angular';
import { GridApi, Column } from '@ag-grid-community/core';
import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey("CompanyName=Safe Lanes Consultants Pte Ltd,LicensedApplication=SAIL,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-033248,SupportServicesEnd=24_September_2023_[v2]_MTY5NTUxMDAwMDAwMA==4d6f42cbd7332fa5adb3dfe9eeba2dfc");

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  gridApi!: GridApi;
  rowData: any[] = [];
  columnDefs = [
    { field: "name", headerName: "Name", sortable: true, filter: true },
    { field: "email", headerName: "Email", sortable: true, filter: true },
    { field: "role", headerName: "Role", sortable: true, filter: true }
  ];
  
  gridOptions: GridOptions = {
    pagination: true, 
    paginationPageSize: 5,
    domLayout: "autoHeight",
  };

  constructor(private usersData: ApiService) {}

  ngOnInit(): void {
    this.usersData.getAllUsers().subscribe((res: any) => {
      this.rowData = res.users;  
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    // this.gridOptions.columnApi = params.columnApi; // Removed as columnApi does not exist on GridOptions
  }
  
}
