import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { claimsAgentList } from '../models/admin/claimsAgentList.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { serviceProviderList } from '../models/admin/serviceProviderList.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements AfterViewInit {
  userProfile: any;
  displayedColumnCA: string[] = ['firstName', 'lastName', 'insuranceCompany', 'email'];
  displayedColumnSP: string[] = [
    'registrationName', 'tradingName', 'contactPerson', 'cellNumber',
    'telNumber', 'email', 'payeeType', 'type', 'companyRegistrationNumber',
    'vatVendor', 'vatNumber'
  ];
  pendingDataSource: MatTableDataSource<claimsAgentList> = new MatTableDataSource<claimsAgentList>();
  pendingDataSourceSP: MatTableDataSource<serviceProviderList> = new MatTableDataSource<serviceProviderList>();

  constructor(private authService: AuthService) {}


  @ViewChild('pendingPaginator') pendingPaginator!: MatPaginator;
  @ViewChild('pendingPaginatorSP') pendingPaginatorSP!: MatPaginator;

  ngAfterViewInit() {
    this.pendingDataSource.paginator = this.pendingPaginator;
    this.pendingDataSourceSP.paginator = this.pendingPaginatorSP;
  }

  ngOnInit(): void {
    this.loadCADetails();
    this.loadServiceProviderDetails();
  }

  loadCADetails() {
    this.authService.getClaimsAgent().subscribe(
      (response: any) => {
        console.log(response.data);
        this.userProfile = response.data;
        const pendingUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Pending');
        console.log('Pending', pendingUsers);
        this.pendingDataSource.data = pendingUsers; // Set the data for the MatTableDataSource
      },
      (error: any) => {
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
    
        this.pendingDataSourceSP.data = pendingUsers;

      },
      (error) => {
        console.error('Error fetching auction details', error);
      }
    );
  }
}
