import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-auction-dialog',
  templateUrl: './delete-auction-dialog.component.html',
  styleUrls: ['./delete-auction-dialog.component.css']
})
export class DeleteAuctionDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAuctionDialogComponent>) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
