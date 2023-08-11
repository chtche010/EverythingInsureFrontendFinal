import { Router } from '@angular/router';

import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiServiceMock } from '../auction-dashboard/api.service.mock';

 

@Component({

  selector: 'app-auction-dialog',

  templateUrl: './auction-dialog.component.html',

  styleUrls: ['./auction-dialog.component.css']

})

export class AuctionDialogComponent implements OnInit {

  bidForm!: FormGroup;

  quoteFile: File | undefined;

  formSubmitted = false;

 

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,

    private dialogRef: MatDialogRef<AuctionDialogComponent>,

    private formBuilder: FormBuilder,

    private apiService: ApiServiceMock,

    private router: Router

  ) { }

 

  ngOnInit(): void {

    this.initializeBidForm();

  }

 

  initializeBidForm() {

    this.bidForm = this.formBuilder.group({

      bidTotalMaterialCost: ['', Validators.required],

      bidTotalLabourCost: ['', Validators.required],

      bidEstimatedDuration: ['', Validators.required],

      quoteFile: [undefined, Validators.required],

    });

  }

 

  onFileSelected(event: any) {

    this.quoteFile = event.target.files[0];

  }

 

  openBidForm() {

    //close the dialog

    this.dialogRef.close();

    //navigate to bid form

    this.router.navigate(['/bid-form']);

  }

 

  submitBid() {

    if (this.bidForm.invalid) {

      this.formSubmitted = true;

      return;

    }

    const bidData = {

      auctionId: this.data.auctionId,

      bidTotalMaterialCost: this.bidForm.get('bidTotalMaterialCost')?.value,

      bidTotalLabourCost: this.bidForm.get('bidTotalLabourCost')?.value,

      bidEstimatedDuration: this.bidForm.get('bidEstimatedDuration')?.value,

      quoteFile: this.quoteFile

    };

 

    // Call the API service to submit the bid

    this.apiService.submitBid(bidData).subscribe({

      next: (response: any) => {

        console.log('Bid submitted successfully:', response);

        // Implement any logic here after successful bid submission

      },

      error: (error: any) => {

        console.error('Error submitting bid:', error);

        // Implement error handling logic if needed

      }

    });

  }

}