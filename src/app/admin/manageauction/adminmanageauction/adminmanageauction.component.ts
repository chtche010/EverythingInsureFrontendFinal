import { Component, ViewChild } from '@angular/core';
import { AdminNavBarComponent } from '../../admin-nav-bar/admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from '../../admin-side-bar/admin-side-bar/admin-side-bar.component';
import { MatTableDataSource } from '@angular/material/table';
import { claimsAgentList } from 'src/app/models/admin/claimsAgentList.model';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { serviceProviderList } from 'src/app/models/admin/serviceProviderList.model';


export interface PeriodicElement {
  auctionTitle: string;
  auctionDate: number;
  startTime: string;
  endTime: string;
  auctionStatus: string;
  guidePrice: number;
  totalMaterialCost: number;
  labourCost: number;
  estimatedDuration: string; 
  totalCost: number; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-adminmanageauction',
  templateUrl: './adminmanageauction.component.html',
  styleUrls: ['./adminmanageauction.component.css']
})
export class AdminmanageauctionComponent {
  displayedColumnss: string[] = ['registrationName', 'tradingName', 'contactPerson', 'cellNumber',
  'telNumber', 'email', 'payeeType', 'type', 'companyRegistrationNumber', 
  'vatVendor', 'vatNumber', 'rejectionReason'
  ];
  displayedColumn: string[] = ['firstName', 'lastName', 'insuranceCompany', 'email', 'rejectionReason'];
  displayedColumns: string[] = ['auctionTitle', 'auctionDate', 'startTime', 'endTime', 'auctionStatus', 'guidePrice', 'totalMaterialCost', 'labourCost', 'estimatedDuration', 'totalCost'];
  dataSource = ELEMENT_DATA;

  rejectedDataSource!: MatTableDataSource<claimsAgentList>;
  rejectedDataSourceSP!: MatTableDataSource<serviceProviderList>;

  @ViewChild('rejectedPaginator')
  rejectedPaginator!: MatPaginator;

  @ViewChild('rejectedPaginatorr')
  rejectedPaginatorr!: MatPaginator;

  ngAfterViewInit() {
    this.rejectedDataSource.paginator = this.rejectedPaginator;
    this.rejectedDataSourceSP.paginator = this.rejectedPaginatorr;
  }

  ngOnInit(): void {
    this.rejectedDataSource = new MatTableDataSource<claimsAgentList>();
    this.rejectedDataSourceSP = new MatTableDataSource<serviceProviderList>();
    this.loadCADetails();
    this.loadServiceProviderDetails();
  }

  constructor(private authService: AuthService) {}

  
  loadCADetails() {
    this.authService.getClaimsAgent().subscribe(
      (response: any) => {
        console.log(response.data);

      const rejectedUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Rejected');
      console.log('Rejected', rejectedUsers);

      this.rejectedDataSource.data = rejectedUsers;
      },
      (error) => {
        console.error('Error fetching claims agent details', error);
      }
    );
  }

  loadServiceProviderDetails() {
    this.authService.getServiceProviders().subscribe(
      (response: any) => {
        console.log(response.data);

        const pendingUsers = response.data.filter((user: serviceProviderList) => user.accountStatus === 'Pending');
        console.log('Pending', pendingUsers);
      const approvedUsers = response.data.filter((user: serviceProviderList) => user.accountStatus === 'Approved');
      console.log('Approved', approvedUsers);

      const rejectedUsers = response.data.filter((user: serviceProviderList) => user.accountStatus === 'Rejected');
      console.log('Rejected', rejectedUsers);

      this.rejectedDataSourceSP.data = rejectedUsers;
      },
      (error) => {
        console.error('Error fetching auction details', error);
      }
    );
  }
}



