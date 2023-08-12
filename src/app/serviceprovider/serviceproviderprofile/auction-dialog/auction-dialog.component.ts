import { Router } from '@angular/router';

import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//take out mock api and replace with real api
import { ApiServiceMock } from '../auction-dashboard/api.service.mock';
import { BidFormComponent } from '../bid-form/bid-form.component';


@Component({

  selector: 'app-auction-dialog',

  templateUrl: './auction-dialog.component.html',

  styleUrls: ['./auction-dialog.component.css']

})

export class AuctionDialogComponent implements OnInit {

  bidForm!: FormGroup;
  formSubmitted = false;



  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,

    private dialogRef: MatDialogRef<AuctionDialogComponent>,

    private formBuilder: FormBuilder,

    private apiService: ApiServiceMock, //replace with real api service!!

    private router: Router

  ) { }



  ngOnInit(): void {

  }

  openBidForm() {
    //close the dialog
    this.dialogRef.close();
    //navigate to bid form
    this.router.navigate(['/bid-form']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}