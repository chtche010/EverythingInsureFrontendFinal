import { Component } from '@angular/core';

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
  dataSource = ELEMENT_DATA;
}
