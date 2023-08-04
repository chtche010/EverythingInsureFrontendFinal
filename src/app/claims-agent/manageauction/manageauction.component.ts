import { Component } from '@angular/core';

export interface PeriodicElement {
  auctionTitle: string;
  auctionDate: number;
  startTime: string;
  endTime: string;
  auctionStatus: string;
  guidePrice: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-manageauction',
  templateUrl: './manageauction.component.html',
  styleUrls: ['./manageauction.component.css']
})
export class ManageauctionComponent {
  displayedColumns: string[] = ['auctionTitle', 'auctionDate', 'startTime', 'endTime', 'auctionStatus', 'guidePrice'];
  dataSource = ELEMENT_DATA;
}
