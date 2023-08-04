import { Component } from '@angular/core';

export interface PeriodicElement {
  jobDescription: string;
  bidTotalMaterialCost: number;
  bidTotalLabourCost: number;
  bidTotalCost: number;
  bidEstimatedDuration: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-sp-activity',
  templateUrl: './sp-activity.component.html',
  styleUrls: ['./sp-activity.component.css']
})
export class SpActivityComponent {
  displayedColumns: string[] = ['jobDescription', 'bidTotalMaterialCost', 'bidTotalLabourCost', 'bidTotalCost', 'bidEstimatedDuration'];
  dataSource = ELEMENT_DATA;
}
