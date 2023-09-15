import { Component } from '@angular/core';

@Component({
  selector: 'app-awardauction',
  templateUrl: './awardauction.component.html',
  styleUrls: ['./awardauction.component.css']
})
export class AwardauctionComponent {
  displayedColumns: string[] = ['Auction title'];
  dataSource: any[] = [];
  row: any;

  constructor() {

  }

  toggleExpansion(row: any): void {
    row.expanded = !row.expanded;
  }

  applyFilter(event: Event): void {
    // Use optional chaining to safely access event.target.value
    const filterValue = (event.target as HTMLInputElement)?.value?.trim().toLowerCase();
    //this.dataSource.filter = filterValue || '';
  }
}
