import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { manageAuctions } from 'src/app/models/claimagent/manageAuctions';

@Component({
  selector: 'app-view-auctions',
  templateUrl: './view-auctions.component.html',
  styleUrls: ['./view-auctions.component.css']
})
export class ViewAuctionsComponent {

  displayedColumns: string[] = ['auctionTitle', 'auctionDate', 'startTime', 'endTime', 'auctionStatus', 'guidePrice'];
  dataSource: MatTableDataSource<manageAuctions> = new MatTableDataSource<manageAuctions>([]);

}
