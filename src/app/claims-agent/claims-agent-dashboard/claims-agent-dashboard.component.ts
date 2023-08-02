import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface AuctionDetails {
  auctionId: number;
  auctionTitle: string;
  auctionDate: string;
  auctionStartTime: string;
  auctionEndTime: string;
  auctionStatus: string;
}
const AUCTION_DATA: AuctionDetails[] = [
  {
    auctionId: 1,
    auctionTitle: 'Auction 1',
    auctionDate: '2023-08-1',
    auctionStartTime: '10:00 AM',
    auctionEndTime: '12:00 PM',
    auctionStatus: 'Active'
  },
  {
    auctionId: 2,
    auctionTitle: 'Auction 2',
    auctionDate: '2023-08-20',
    auctionStartTime: '2:00 PM',
    auctionEndTime: '4:00 PM',
    auctionStatus: 'Upcoming'
  },
  {
    auctionId: 3,
    auctionTitle: 'Toyota repair',
    auctionDate: '2023-08-25',
    auctionStartTime: '6:00 PM',
    auctionEndTime: '4:00 PM',
    auctionStatus: 'Upcoming'
  },
  // Add more upcoming auctions here...
];
@Component({
  selector: 'app-claims-agent-dashboard',
  templateUrl: './claims-agent-dashboard.component.html',
  styleUrls: ['./claims-agent-dashboard.component.css']
})
export class ClaimsAgentDashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['auctionId', 'auctionTitle', 'auctionDate', 'auctionStartTime', 'auctionEndTime', 'auctionStatus'];
  upcomingAuctions = new MatTableDataSource(AUCTION_DATA);
  

  constructor(private _liveAnnouncer: LiveAnnouncer) { this.sort = new MatSort(); }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    // You can fetch the actual data from your backend API here and populate the upcomingAuctions array.
    // For demonstration purposes, we leave it as an empty array.
    //this.dataSource = new MatTableDataSource(this.upcomingAuctions);
    this.upcomingAuctions.sort = this.sort;
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('Sorted ${sortState.direction}ending');
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
