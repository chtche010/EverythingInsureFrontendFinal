import { Component } from '@angular/core';

export interface PeriodicElement {
  customerName: string;
  customerEmail: number;
  vehicleMake: number;
  vehicleModel: string;
  modelYear: number;
  MMCode: number;
  damageDescription: string; 
  customerSurbub: string; 
  customerCity: string; 
  customerProvince: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-manageclaims',
  templateUrl: './manageclaims.component.html',
  styleUrls: ['./manageclaims.component.css'],
})

export class ManageclaimsComponent {
  displayedColumns: string[] = ['customerName', 'customerEmail', 'vehicleMake', 'vehicleModel', 'modelYear', 'MMCode', 'damageDescription', 'customerSurbub', 'customerCity', 'customerProvince'];
  dataSource = ELEMENT_DATA;
}
