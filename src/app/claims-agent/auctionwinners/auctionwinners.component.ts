import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';
import { AuctionWinner } from 'src/app/models/claimagent/auctionWinner';

@Component({
  selector: 'app-auctionwinners',
  templateUrl: './auctionwinners.component.html',
  styleUrls: ['./auctionwinners.component.css']
})
export class AuctionwinnersComponent implements OnInit {
  auctionWinners: AuctionWinner[] = []; // Initialize with the data from the API  

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  openDatePickerDialog(auctionReportId: number) {
    const dialogRef = this.dialog.open(DatePickerDialogComponent);

    dialogRef.afterClosed().subscribe((selectedDate: Date) => {
      if (selectedDate) {
        const formattedDate = this.formatDate(selectedDate);
        this.setAuctionDate(auctionReportId, formattedDate);
      }
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00.0000000`;
  }

  ngOnInit() {
    this.authService.getReportAwarded().subscribe((response: any) => {
      this.auctionWinners = response.data;
    });
  }

  setAuctionDate(auctionReportId: number, selectedDate: string) {
    // Call the API endpoint with the auctionReportId and formatted date
    this.authService.setAuctionDate(auctionReportId, selectedDate).subscribe((response) => {
      // Handle the API response as needed
      console.log("API Response:", response);
    });
  }
}
