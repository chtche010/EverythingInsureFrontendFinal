import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

 //import { ApiService } from 'src/app/services/api.service';

//mock api

import { ApiServiceMock } from './api.service.mock';

import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';

 

 

@Component({

  selector: 'app-auction-dashboard',

  templateUrl: './auction-dashboard.component.html',

  styleUrls: ['./auction-dashboard.component.css']

})

 

export class AuctionDashboardComponent implements OnInit {

  auctionEvents: any[] = []; // Update this type based on your DTO structure

  selectedAuction: any; // Update this type based on your DTO structure

  formSubmitted = false;

 

  constructor(private apiService: ApiServiceMock, private formBuilder: FormBuilder, public dialog: MatDialog) { }

 

  openDialog(auctionEvent: any): void {

    const dialogRef = this.dialog.open(AuctionDialogComponent, {

      width: '80%',

      enterAnimationDuration: '500ms',

      data: auctionEvent

    });

 

    dialogRef.afterClosed().subscribe(

      result => console.log('The dialog was closed', result)

      // You can do something with the result here if needed

    );

  }

 

 

  ngOnInit(): void {

    this.fetchAuctionEvents();

  }

 

  fetchAuctionEvents() {

    this.apiService.getAuctionEvents().subscribe(

      (response: any) => { // Explicitly type the response as an array of any

        this.auctionEvents = response;

      },

      (error: any) => {

        console.error('Error fetching auction events:', error);

      }

    );

  }

 

}

 