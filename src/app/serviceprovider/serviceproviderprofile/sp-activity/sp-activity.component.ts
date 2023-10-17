import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateBidComponent } from '../../update-bid/update-bid/update-bid.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialListComponent } from '../material-list/material-list/material-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sp-activity',
  templateUrl: './sp-activity.component.html',
  styleUrls: ['./sp-activity.component.css']
})

export class SpActivityComponent implements OnInit {
  displayedColumns: string[] = ['jobDescription', 'bidTotalLabourCost', 'bidEstimatedDuration', 'actions',];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(
    private authService: AuthService, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private route: ActivatedRoute) {}

  openDialog(bidId: number): void {
    this.authService.getSingleBid(bidId).subscribe((response) => {
      const dialogRef = this.dialog.open(UpdateBidComponent, {
        width: '400px',
        data: response.data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed', result);
        // Reload the bid details after the dialog is closed
        this.loadBidDetails();
      });
    });
  }

  ngOnInit(): void {
    this.loadBidDetails();
    this.changeIcon();
  }

  changeIcon() {
    return this.authService.setCurrentIcon('favorite_border');
  }

  loadBidDetails() {
    this.authService.getbiddetails().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.dataSource.data = response.data;
      },
      (error) => {
        console.error('Error fetching bid details', error);
      }
    );
  }

  deleteClaim() {
    // Implement delete functionality here if needed
  }

  openMaterialList(bidId: number): void {
    console.log('Clicked bidId:', bidId);
    this.router.navigate(['/material-list', bidId], { relativeTo: this.route });
}

}
