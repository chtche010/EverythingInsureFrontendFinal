
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
  images: string[];
 

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService) {
      this.images = [];
     }

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
  fetchAuctionImages(auctionEvent: GetAllAuctions) {
    console.log('Fetching images for auction event:', auctionEvent);
    if (auctionEvent.auctionId === undefined || auctionEvent.auctionId === null) {
      console.log('AuctionId:', auctionEvent.auctionId);
      return; // Exit early if ClaimId is not valid
    }
  
    this.authService.getClaimImages(auctionEvent.auctionId).subscribe(
      (images: string[]) => {
        auctionEvent.images = images;
      },
      (error) => {
        console.error('Error fetching auction images:', error);
      }
    );
  }
  
/*
  fetchAuctionImages(auctionEvent: GetAllAuctions) {
    console.log('Fetching images for auction event:', auctionEvent);
    console.log('claimId:', auctionEvent.ClaimId);
    this.authService.getClaimImages(auctionEvent.ClaimId).subscribe(
      (images: string[]) => {
        auctionEvent.images = images;
      },
      (error) => {
        console.error('Error fetching auction images:', error);
      }
    );
  }
*/
  getAuctionEvents(): void {
    this.authService.getOpenAuctions().subscribe(
      (response: any) => {
        console.log('Open Auctions:', response.data);

        this.openAuctions = response.data;
        this.openAuctions.forEach((auction) => this.fetchAuctionImages(auction));
        this.processAuctions(this.openAuctions);
        if (this.openAuctions && this.openAuctions.length > 0) {
          // Loop through all upcoming auctions
          for (const auction of this.openAuctions) {
            // Log the ID for each auction
            this.selectedAuctionId = auction.auctionId;
            console.log('Auction ID:', auction.auctionId);

            if (auction.isFav === true) {
              this.favoriteEvents.push(auction)
            }

            console.log('Fav auctions', this.favoriteEvents)


          }
        } else {
          console.log('No upcoming auctions found.');
        }

      },
      error => {
        console.log('Error fetching open auctions:', error);
      }
    );

    this.authService.getUpcomingAuctions().subscribe(
      (response: any) => {
        console.log('Upcoming Auctions:', response.data);
        this.upcomingAuctions = response.data;
        this.upcomingAuctions.forEach((auction) => this.fetchAuctionImages(auction));
        this.processAuctions(this.upcomingAuctions);
        if (this.upcomingAuctions && this.upcomingAuctions.length > 0) {
          // Loop through all upcoming auctions
          for (const auction of this.upcomingAuctions) {
            // Log the ID for each auction
            this.selectedAuctionId = auction.auctionId;
            console.log('Auction ID:', auction.auctionId);

            if (auction.isFav === true) {
              this.favoriteEvents.push(auction)
            }

            console.log('Fav auctions', this.favoriteEvents)


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
        this.closedAuctions.forEach((auction) => this.fetchAuctionImages(auction));
        this.processAuctions(this.closedAuctions);
        if (this.closedAuctions && this.closedAuctions.length > 0) {
          // Loop through all upcoming auctions
          for (const auction of this.closedAuctions) {
            // Log the ID for each auction
            this.selectedAuctionId = auction.auctionId;
            console.log('Auction ID:', auction.auctionId);

            if (auction.isFav === true) {
              this.favoriteEvents.push(auction)
            }

            console.log('Fav auctions', this.favoriteEvents)


          }
        } else {
          console.log('No upcoming auctions found.');
        }
      },
      error => {
        console.log('Error fetching closed auctions:', error);
      }
    );
  }
  processAuctions(auctions: GetAllAuctions[]): void {
    auctions.forEach((auction) => {
      if (auction.isFav) {
        this.favoriteEvents.push(auction.auctionId);
      }
    });
  }
  // Function to like an auction
  // favoriteEvent(event: Event, auctionEvent: GetAllAuctions): void {
  //   event.stopPropagation(); // Prevent the click event from propagating to the card click event

  //   this.authService.likeAuction(auctionEvent.auctionId).subscribe(
  //     (response: any) => {
  //       if (response.success) {
  //         auctionEvent.isFav = true; // Update the UI to indicate that the auction is favorited
  //         this.favoriteEvents.push(auctionEvent);
  //       }
  //       console.log(response.message);
  //     },
  //     (error: any) => {
  //       console.error('Error liking auction:', error);
  //     }
  //   );
  // }
  // changeIcon() {
  //   return this.authService.setCurrentIcon('favorite_border');
  // }
  // isEventFavorite(auctionEvent: GetAllAuctions): boolean {
  //   return this.favoriteEvents.includes(auctionEvent.auctionId);
  // }

  




  favoriteEvent(event: any, auctionEvent: any) {   
    event.stopPropagation();//this line prevents the event from bubbling up
    if (this.isEventFavorite(auctionEvent)) {
      
      this.unfavouriteAuction(auctionEvent.auctionId);
      this.removeFromFavorites(auctionEvent);
    } else {
     // console.log(this.selectedAuctionId)
      const id = this.selectedAuctionId !== null ? Math.floor(this.selectedAuctionId) : 0;
     // console.log(id)
     //this.favouriteAuction(id);
 
     
     this.favouriteAuction(auctionEvent.auctionId);
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
    //const idAuction = id;

        this.authService.likeAuction(id).subscribe(
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
 
              changeIcon() {
                return this.authService.setCurrentIcon('favorite_border');
              }

            }
 





