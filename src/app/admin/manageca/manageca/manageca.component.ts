import { Component } from '@angular/core';

export interface PeriodicElement {
  firstName: number;
  lastName: string;
  insuranceCompany: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-manageca',
  templateUrl: './manageca.component.html',
  styleUrls: ['./manageca.component.css']
})
export class ManagecaComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'insuranceCompany', 'email'];
  dataSource = ELEMENT_DATA;
}
