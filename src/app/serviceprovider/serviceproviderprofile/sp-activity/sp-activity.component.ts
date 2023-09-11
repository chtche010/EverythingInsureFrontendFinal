import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { getBids } from 'src/app/models/serviceprovider/getBids';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateBidComponent } from '../../update-bid/update-bid/update-bid.component';
import { MatDialog } from '@angular/material/dialog';
import { updateBid } from 'src/app/models/serviceprovider/updateBid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sp-activity',
  templateUrl: './sp-activity.component.html',
  styleUrls: ['./sp-activity.component.css']
})

export class SpActivityComponent {
  displayedColumns: string[] = ['jobDescription', 'bidTotalMaterialCost', 'bidTotalLabourCost', 'bidTotalCost', 'bidEstimatedDuration', 'actions'];
  dataSource = new MatTableDataSource<getBids>;
  //bidDetails: any;

  constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    //this.dataSource = new MatTableDataSource<getBids>();
    this.loadBidDetails();
  }

  openDialog(BidToUpdate: any): void {
    console.log('BidToUpdate:', BidToUpdate);
    console.log('bidId:', BidToUpdate.bidId);

    const dialogRef = this.dialog.open(UpdateBidComponent, {
      width: '80%',
      enterAnimationDuration: '500ms',
      data: { 
        //BidToUpdate, 
        bidId: BidToUpdate.bidId
      },
    });
  
    dialogRef.afterClosed().subscribe(
      result => console.log('The dialog was closed', result)
    );

    this.loadBidDetails();
    }

  loadBidDetails() {
    this.authService.getbiddetails().subscribe(
      (response: any) => {
        console.log(response.data)
        this.dataSource.data = response.data;
      },
      (error) =>
      console.error('Error fetching bid details', error)
    );
  }

  deleteClaim() {

  }
}
