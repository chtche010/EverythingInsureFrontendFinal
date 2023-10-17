import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auctiondetailsdialog',
  templateUrl: './auctiondetailsdialog.component.html',
  styleUrls: ['./auctiondetailsdialog.component.css']
})
export class AuctiondetailsdialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<AuctiondetailsdialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
