import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { manageAuctions } from 'src/app/models/claimagent/manageAuctions';
import { MatDialog } from '@angular/material/dialog';
import { UpdateauctionComponent } from '../updateauction/updateauction/updateauction.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteAuctionDialogComponent } from '../delete-auction/delete-auction-dialog/delete-auction-dialog.component';

@Component({
  selector: 'app-manageauction',
  templateUrl: './manageauction.component.html',
  styleUrls: ['./manageauction.component.css'],
})

export class ManageauctionComponent {
  displayedColumns: string[] = ['auctionTitle', 'auctionDate', 'startTime', 'endTime', 'auctionStatus', 'guidePrice', 'actions'];
  dataSource: MatTableDataSource<manageAuctions> = new MatTableDataSource<manageAuctions>([]);

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  openDialog(updateAuction: any): void {
    console.log('auctionId:', updateAuction.auctionId);

    const dialogRef = this.dialog.open(UpdateauctionComponent, {
      width: '60%',
      enterAnimationDuration: '500ms',
      data: { updateAuction, auctionId: updateAuction.auctionId},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // Reload data after the dialog closes if needed
      this.loadAuctionDetails();
    });
  }

  ngOnInit(): void {
    this.loadAuctionDetails();
  }

  loadAuctionDetails() {
    this.authService.cagetauctions().subscribe(
      (response: any) => {
        console.log(response.data);
        this.dataSource.data = response.data;
      },
      (error) => {
        console.error('Error fetching auction details', error);
      }
    );
  }

  openDeleteDialog(auctionId: number): void {
    const dialogRef = this.dialog.open(DeleteAuctionDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.deleteAuction(auctionId).subscribe(
          () => {
            console.log('Claim deleted successfully');
            this.loadAuctionDetails();
          },
          (error) => {
          console.log('Error deleting claim:', error);
        }
        );
      }
    });
  }

  applyFilter(event: Event): void {
    // Use optional chaining to safely access event.target.value
    const filterValue = (event.target as HTMLInputElement)?.value?.trim().toLowerCase();
    this.dataSource.filter = filterValue || '';
  }
}
