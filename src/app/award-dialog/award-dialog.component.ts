import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-award-dialog',
  templateUrl: './award-dialog.component.html',
  styleUrls: ['./award-dialog.component.css'],
})

export class AwardDialogComponent {
  displayedColumns: string[] = ['status', 'jobDescription', 'bidTotalMaterialCost', 'bidTotalLabourCost', 'bidTotalCost', 'bidEstimatedDuration', 'selectWinner'];
  selectedWinner: number | undefined;
  overrideReason: string = '';
  isReasonRequired: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AwardDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // Sort the top3Bids based on the "status" field
    this.data.top3Bids.sort((a: any, b: any) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return 0;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onWinnerSelect(bidId: number): void {
    // Store the selected winner bidId
    this.selectedWinner = bidId;

    if (this.selectedWinner !== bidId) {
      this.overrideReason = '';
    }
  }

  onSubmit() {
    if (this.selectedWinner) {
      const selectedBid = this.data.top3Bids.find((bid: any) => bid.bidId === this.selectedWinner);

      // Check if a reason is required
      if (selectedBid.status !== 'Position1' && !this.overrideReason) {
        // Handle the case where a reason is required but not provided
        // You can show an error message to the user or handle it as needed.
        console.log('Reason is required for override.');
        return;
      }

      // Prepare the request data
      const requestData = {
        auctionReportId: this.data.auctionReportId, // You should update this to the actual field
        bidId: this.selectedWinner,
        reason: selectedBid.status !== 'Position1' ? this.overrideReason : '', // Provide the reason if required
      };

      console.log('auctionReportId:', this.data.auctionReportId),
      console.log('bidId:', this.selectedWinner),
      console.log('reason:', this.overrideReason),

      // Make a PUT request to the API using your service method
      this.authService.selectWinner(requestData).subscribe(
        (response) => {
          // Handle the success response as needed
          console.log('Winner selected successfully', response);
          this.dialogRef.close();
        },
        (error) => {
          // Handle errors from the API
          console.error('Error selecting winner', error);
        }
      );
    }
  }

 getBidPosition(status: string): string {
    switch (status) {
      case 'Position1':
        return '1';
      case 'Position2':
        return '2';
      case 'Position3':
        return '3';
      default:
        return status; // Handle other statuses as needed
    }
  }
}
