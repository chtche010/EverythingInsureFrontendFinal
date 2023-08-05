import { Component } from '@angular/core';
import { AdminNavBarComponent } from '../../admin-nav-bar/admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from '../../admin-side-bar/admin-side-bar/admin-side-bar.component';

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
  displayedColumns: string[] = ['auctionTitle', 'auctionDate', 'startTime', 'endTime', 'auctionStatus', 'guidePrice', 'totalMaterialCost', 'labourCost', 'estimatedDuration', 'totalCost'];
  dataSource = ELEMENT_DATA;
}
