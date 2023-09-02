import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { GetAllAuctions } from 'src/app/models/auction-dashboard/getallauctions';

@Component({
  selector: 'app-auction-dashboard',
  templateUrl: './auction-dashboard.component.html',
  styleUrls: ['./auction-dashboard.component.css']
})

export class AuctionDashboardComponent implements OnInit {
  auctionEvents: GetAllAuctions[] = [];
  favoriteEvents: any[] = []; //array to store favorite events
  selectedAuction: any; // <------------Update this type based on your DTO structure
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private authService: AuthService) { } 

  openDialog(auctionEvent: any): void {
    console.log('AuctionId:', auctionEvent.auctionId);
    
    const dialogRef = this.dialog.open(AuctionDialogComponent, {
      width: '80%',
      enterAnimationDuration: '500ms',
      data: { auctionEvent, auctionId: auctionEvent.auctionId }
    });

    dialogRef.afterClosed().subscribe(
      result => console.log('The dialog was closed', result)
      // You can do something with the result here if needed
    );
  }

  ngOnInit(): void {
    this.getAuctionEvents();
  }
  
  getAuctionEvents(): void {
    this.authService.getUpcomingAuctions().subscribe(
      (response: any) => {
        console.log('Upcoming auctions', response.data);
        this.auctionEvents = response.data;
      },
      error => {
        console.log('Error fetching upcoming auctions:', error);
      }
    );
  
    this.authService.getOpenAuctions().subscribe(
      openAuctions => {
        console.log('Open Auctions:', openAuctions);
        this.auctionEvents = this.auctionEvents.concat(openAuctions);
      },
      error => {
        console.log('Error fetching open auctions:', error);
      }
    );
  
    this.authService.getClosedAuctions().subscribe(
      closedAuctions => {
        console.log('Closed Auctions:', closedAuctions);
        this.auctionEvents = this.auctionEvents.concat(closedAuctions);
      },
      error => {
        console.log('Error fetching closed auctions:', error);
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

