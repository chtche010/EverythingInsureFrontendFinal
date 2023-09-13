import { Component } from '@angular/core';

@Component({
  selector: 'app-bid-select',
  templateUrl: './bid-select.component.html',
  styleUrls: ['./bid-select.component.css']
})
export class BidSelectComponent {
  displayedColumns: string[] = ['auctionTitle', 'firstPlaceBid', 'secondPlaceBid', 'thirdPlaceBid', 'action'];
     tableData: any[] = [
       { auctionTitle: 'Auction 1', firstPlaceBid: 100, secondPlaceBid: 90, thirdPlaceBid: 80 },
       { auctionTitle: 'Auction 2', firstPlaceBid: 150, secondPlaceBid: 120, thirdPlaceBid: 110 },
       { auctionTitle: 'Auction 3', firstPlaceBid: 200, secondPlaceBid: 180, thirdPlaceBid: 160 },
     ];
}
