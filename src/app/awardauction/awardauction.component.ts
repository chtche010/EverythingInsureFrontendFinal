import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AwardDialogComponent } from '../award-dialog/award-dialog.component'; // Import the award dialog component

@Component({
  selector: 'app-awardauction',
  templateUrl: './awardauction.component.html',
  styleUrls: ['./awardauction.component.css'],
})
export class AwardauctionComponent implements OnInit {
  auctions: any[] = [];

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch the list of auctions that need to be awarded
    this.authService.awardAuctions().subscribe((response) => {
      this.auctions = response;
    });
  }

  openAwardDialog(auction: any): void {
    // Open the award dialog and pass the data for the top three bids
    const dialogRef = this.dialog.open(AwardDialogComponent, {
      width: '600px', // Adjust the width as needed
      data: auction.top3Bids,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The award dialog was closed');
    });
  }
}