import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AwardDialogComponent } from '../award-dialog/award-dialog.component'; // Import the award dialog component
import { AuctiondetailsdialogComponent } from '../auctiondetailsdialog/auctiondetailsdialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-awardauction',
  templateUrl: './awardauction.component.html',
  styleUrls: ['./awardauction.component.css'],
})
export class AwardauctionComponent {
  auctions: any[] = [];
  displayedColumns: string[] = ['auctionId', 'actions'];

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadAuctions();
  }

  loadAuctions() {
    this.authService.getAllReports().subscribe((data) => {
      this.auctions = data.data;
      console.log('Auctions:', this.auctions);
    });
  }

  viewAuctionDetails(auctionId: number) {
    const selectedAuction = this.auctions.find(auction => auction.auctionId === auctionId);

    if (selectedAuction) {
      this.dialog.open(AuctiondetailsdialogComponent, {
        data: selectedAuction,
        width: '400px'
      });
    }
  }

  selectWinner(auctionId: number) {
    const selectedAuction = this.auctions.find(auction => auction.auctionId === auctionId);
  
    if (selectedAuction) {
      this.dialog.open(AwardDialogComponent, {
        data: selectedAuction,
        width: '1000px'
      });
    }
  }
}