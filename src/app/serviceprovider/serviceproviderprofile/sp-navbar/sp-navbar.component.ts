import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sp-navbar',
  templateUrl: './sp-navbar.component.html',
  styleUrls: ['./sp-navbar.component.css']
})
export class SpNavbarComponent implements OnInit{
  currentIcon!: string;
  userProfile: any;
  
  constructor(private authService: AuthService) { }
  
  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.loadUserProfile();
    //this.loadAddress(this.serviceProviderId);
    //this.loadBankDetails();
    this.currentIcon = this.authService.getCurrentIcon();
  }

  loadUserProfile(){
    this.authService.getspdetails().subscribe(
      (response) => {
        this.userProfile = {...response.data}; // Store the user profile data in userProfile
        console.log(response);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  getAllfavourites(){
    this.authService.getAllfavouriteAuction().subscribe(
      (response) => {
        console.log('All fav', response);
      },
      error => {
        console.log('Error fetching upcoming auctions:', error);
      }
    );

  }

  

}
