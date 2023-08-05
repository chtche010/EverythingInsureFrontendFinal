import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  jobDescription: string;
  bidTotalMaterialCost: number;
  bidTotalLabourCost: number;
  bidTotalCost: number;
  bidEstimatedDuration: string;
  auction: string; 
  serviceProvider: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-managebid',
  templateUrl: './managebid.component.html',
  styleUrls: ['./managebid.component.css']
})
export class ManagebidComponent {
  displayedColumns: string[] = ['jobDescription', 'bidTotalMaterialCost', 'bidTotalLabourCost', 'bidTotalCost', 'bidEstimatedDuration', 'auction', 'serviceProvider'];
  dataSource = ELEMENT_DATA;
}
