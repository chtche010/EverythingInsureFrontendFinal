
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { GetAllAuctions } from 'src/app/models/auction-dashboard/getallauctions';

@Component({
  selector: 'app-auction-dashboard',
  templateUrl: './auction-dashboard.component.html',
  styleUrls: ['./auction-dashboard.component.css']
})

export class AuctionDashboardComponent implements OnInit {
  selectedAuctionId: number | null = null;
  openAuctions: GetAllAuctions[] = [];
  upcomingAuctions: GetAllAuctions[] = [];
  closedAuctions: GetAllAuctions[] = [];
  favoriteEvents: any[] = []; // Array to store favorite events
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
    );
  }

  ngOnInit(): void {
    this.getAuctionEvents();
  }

  getAuctionEvents(): void {
    this.authService.getOpenAuctions().subscribe(
      (response: any) => {
        console.log('Open Auctions:', response.data);
        this.openAuctions = response.data;
        var auctionId: number = 0;
        console.log(this.openAuctions);


       

      },
      error => {
        console.log('Error fetching open auctions:', error);
      }
    );

    this.authService.getUpcomingAuctions().subscribe(
      (response: any) => {
        console.log('Upcoming Auctions:', response.data);
        this.upcomingAuctions = response.data;

        if (this.upcomingAuctions && this.upcomingAuctions.length > 0) {
          // Loop through all upcoming auctions
          for (const auction of this.upcomingAuctions) {
            // Log the ID for each auction
            this.selectedAuctionId = auction.auctionId;
            console.log('Auction ID:', auction.auctionId);
 
            if( auction.isFav === true){
              this.favoriteEvents.push(auction)
            } 

            console.log('Fav auctions',this.favoriteEvents)


          }
        } else {
          console.log('No upcoming auctions found.');
        }
    
      },
      error => {
        console.log('Error fetching upcoming auctions:', error);
      }
    );

    this.authService.getClosedAuctions().subscribe(
      (response: any) => {
        console.log('Closed Auctions:', response.data);
        this.closedAuctions = response.data;
        console.log(this.closedAuctions);
      },
      error => {
        console.log('Error fetching closed auctions:', error);
      }
    );
  }

  favoriteEvent(event: any, auctionEvent: any) {
   
    event.stopPropagation();//this line prevents the event from bubbling up
    if (this.isEventFavorite(auctionEvent)) {
      const id = this.selectedAuctionId !== null ? Math.floor(this.selectedAuctionId) : 0;

      this.unfavouriteAuction(id);
      this.removeFromFavorites(auctionEvent);
    } else {
      console.log(this.selectedAuctionId)
      //var id = this.selectedAuctionId;

      const id = this.selectedAuctionId !== null ? Math.floor(this.selectedAuctionId) : 0;
            console.log(id)
     this.favouriteAuction(id);

      this.addToFavorites(auctionEvent);
    }
  }

  isEventFavorite(auctionEvent: any): boolean {
    //console.log(auctionEvent)
    return this.favoriteEvents.includes(auctionEvent);
  }

  addToFavorites(auctionEvent: any) {
    this.favoriteEvents.push(auctionEvent);
    console.log(auctionEvent);
  }

  removeFromFavorites(auctionEvent: any) {
    const index = this.favoriteEvents.indexOf(auctionEvent);
    if (index > -1) {
      this.favoriteEvents.splice(index, 1);
    }
  }

  favouriteAuction(id: number){
    console.log(id)
        this.authService.favouriteAuction(id).subscribe(
          (response: any) => {
            console.log('Success favourited', response);
          },
          error => {
            console.log('Error fetching upcoming auctions:', error);
          }
        );
        }

        unfavouriteAuction(id: number){
          console.log(id)
              this.authService.unfavouriteAuction(id).subscribe(
                (response: any) => {
                  console.log('Success unfavourited', response);
                },
                error => {
                  console.log('Error fetching upcoming auctions:', error);
                }
              );
              }


      }




