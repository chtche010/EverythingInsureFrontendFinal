import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { serviceProviderList} from 'src/app/models/admin/serviceProviderList.model'
import { AuthService } from 'src/app/services/auth.service';

export interface PeriodicElement {
  registrationName: string;
  tradingName: string;
  contactPerson: string;
  cellNumber: number;
  telNumber: number;
  email: string;
  payeeType: string;
  type: string;
  companyRegistrationNumber: number;
  VATVendor: string;
  VATNumber: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-managesp',
  templateUrl: './managesp.component.html',
  styleUrls: ['./managesp.component.css']
})
export class ManagespComponent {
  displayedColumns: string[] = ['registrationName', 'tradingName', 'contactPerson', 'cellNumber',
                                'telNumber', 'email', 'payeeType', 'type', 'companyRegistrationNumber',
                                ];
  dataSource!: MatTableDataSource<serviceProviderList>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<serviceProviderList>();
    this.loadAuctionDetails();
  }
  
  loadAuctionDetails() {
    this.authService.getServiceProviders().subscribe(
      (response: any) => {
        console.log(response.data);
        this.dataSource.data = response.data;
      },
      (error) => {
        console.error('Error fetching auction details', error);
      }
    );
  }
  

  
}

