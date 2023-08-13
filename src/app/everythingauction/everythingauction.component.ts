import { Component } from '@angular/core';

@Component({
  selector: 'app-everythingauction',
  templateUrl: './everythingauction.component.html',
  styleUrls: ['./everythingauction.component.css']
})

export class EverythingauctionComponent {
  activeAuctions: any[] = []; // Fill with actual data
  upcomingClaims: any[] = []; // Fill with actual data

  navigateActiveAuctions() {
    // Implement navigation logic for active auctions
  }

  navigateUpcomingClaims() {
    // Implement navigation logic for upcoming claims
  }
}
