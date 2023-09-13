import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//take out mock api and replace with real api
import { ApiServiceMock } from '../auction-dashboard/api.service.mock';
import { BidFormComponent } from '../bid-form/bid-form.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auction-dialog',
  templateUrl: './auction-dialog.component.html',
  styleUrls: ['./auction-dialog.component.css']
})

export class AuctionDialogComponent implements OnInit {
  bidForm!: FormGroup;
  formSubmitted = false;
  auctionDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AuctionDialogComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiServiceMock, //replace with real api service!!
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log('Received auctionId:', this.data.auctionId);
    this.loadAuctionDetails(this.data.auctionId);
  }

  loadAuctionDetails(auctionId: number): void {
    this.authService.getSingleAuction(auctionId).subscribe(
      (response: any) => {
        console.log('Hello',response.data)
        this.auctionDetails = response.data;
      }, 
      (error) => {
        console.error('Error fetching auction details:', error);
      }
    );
  }

  openBidForm() {
    //close the dialog
    this.dialogRef.close();
    //navigate to bid form
    this.router.navigate(['/bid-form'], {
      queryParams: { auctionId: this.data.auctionId }
    });
    console.log('AuctionId', this.data.auctionId)
  }

  closeDialog() {
    this.dialogRef.close();
  }

}