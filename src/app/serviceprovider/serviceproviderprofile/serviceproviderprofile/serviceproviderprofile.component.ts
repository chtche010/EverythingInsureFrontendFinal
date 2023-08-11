import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-serviceproviderprofile',
  templateUrl: './serviceproviderprofile.component.html',
  styleUrls: ['./serviceproviderprofile.component.css']
})
export class ServiceproviderprofileComponent implements OnInit {
  userProfile: any;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.loadUserProfile();
    //this.loadAddress();
    //this.loadBankDetails();
  }

  loadUserProfile(){
    this.authService.getspdetails().subscribe(
      (response) => {
        this.userProfile = response.data; // Store the user profile data in userProfile
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  // loadAddress() {
  //   this.sharedServices.getServiceProviderAddress('AddressId').subscribe(
  //     (data) => {
  //       this.address = data;
  //     },
  //     (error) => {
  //       console.log('Error fetching address', error);
  //     }
  //   );
  // }

  // loadBankDetails() {
  //   this.sharedServices.getServiceProviderBank('BankDetailsId').subscribe(
  //     (data) => {
  //       this.bankDetails = data; // Store the bank details data in the bankDetails variable
  //     },
  //     (error) => {
  //       console.error('Error fetching bank details:', error);
  //     }
  //   );
  // }

  // logout() {
  //   this.sharedServices.signOut();
  // }

  updateProfile() {
    this.authService.updatespdetails(this.userProfile).subscribe(
      (data) => {
        //Show success message 
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}

