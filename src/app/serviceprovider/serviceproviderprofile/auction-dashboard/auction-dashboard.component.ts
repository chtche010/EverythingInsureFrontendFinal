import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

//import { ApiService } from 'src/app/services/api.service';

//mock api is below, replace with real!
import { ApiServiceMock } from './api.service.mock';//<-----replace with real

import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';





@Component({

  selector: 'app-auction-dashboard',

  templateUrl: './auction-dashboard.component.html',

  styleUrls: ['./auction-dashboard.component.css']

})



export class AuctionDashboardComponent implements OnInit {

  auctionEvents: any[] = []; // <-----------Update this type based on your DTO structure
  favoriteEvents: any[] = []; //array to store favorite events
  selectedAuction: any; // <------------Update this type based on your DTO structure
  formSubmitted = false;



  constructor(private apiService: ApiServiceMock, private formBuilder: FormBuilder, public dialog: MatDialog) { } //<--------replace mockapi here



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

    this.apiService.getAuctionEvents().subscribe( //<------replace API here

      (response: any) => { // Explicitly type the response as an array of any

        this.auctionEvents = response;

      },

      (error: any) => {

        console.error('Error fetching auction events:', error);

      }

    );

  }
  favoriteEvent(event: any, auctionEvent: any) {
    event.stopPropagation();//this line prevents the event from bubbling up
    if (this.isEventFavorite(auctionEvent)) {
      this.removeFromFavorites(auctionEvent);
    } else {
      this.addToFavorites(auctionEvent);
    }
  }

  isEventFavorite(auctionEvent: any): boolean {
    return this.favoriteEvents.includes(auctionEvent);
  }

  addToFavorites(auctionEvent: any) {
    this.favoriteEvents.push(auctionEvent);
  }

  removeFromFavorites(auctionEvent: any) {
    const index = this.favoriteEvents.indexOf(auctionEvent);
    if (index > -1) {
      this.favoriteEvents.splice(index, 1);
    }
  }


}

