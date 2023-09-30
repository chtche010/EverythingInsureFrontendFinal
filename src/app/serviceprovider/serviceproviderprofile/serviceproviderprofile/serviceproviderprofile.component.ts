import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serviceproviderprofile',
  templateUrl: './serviceproviderprofile.component.html',
  styleUrls: ['./serviceproviderprofile.component.css']
})
export class ServiceproviderprofileComponent implements OnInit {
  userProfile: any;
  address: any;
  email = "";
  chanegPasswordForm!: FormGroup;


  constructor(
    private authService: AuthService,
     private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
      private router: Router,
      private snackbar: MatSnackBar,


  ){}

  serviceProviderId!: number;
  addressId!: number;

  ngOnInit(): void {
    this.loadUserProfile();
    this.checkVeri(this.email);

    //this.addressId = this.userProfile.addressId;
    this.loadAddress(this.address);
    //this.loadBankDetails();

    
  }

  checkVeri(email: string){

    this.authService.checkVeri(email)
    .subscribe({
      next: (res)=>{
        console.log(email)
        this.snackbar.open('Success! Email Verified', 'Close', { duration: 2000 });

        this.router.navigate(['/home']);
      },
      error: (err)=>{
       //this.snackbar.open('Error! Something went wrong', 'Close', { duration: 2000 }); 

      }
    })

  }

  loadUserProfile(){
    this.authService.getspdetails().subscribe(
      (response) => {
        this.userProfile = {...response.data}; // Store the user profile data in userProfile
        console.log(response);

        const serviceProviderId = response.data.serviceProviderId;
        this.serviceProviderId = serviceProviderId;
        this.loadAddress(this.serviceProviderId);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadAddress(addressId: number) {
    this.authService.getAddressById(addressId).subscribe(
      (response: any) => {
        console.log('Address Id:', addressId);
        console.log('Address data:', this.address);
        this.address = response.data;
      },
      (error) => {
        console.log('Error fetching address', error);
      }
    );
  }

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
          console.log('Profile updated successfully:', data);
          this.loadUserProfile();
          this.snackBar.open('Your profile has been updated successfully', 'Close', {duration: 3000});
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
  }

updateAddress() {
  // Make sure you include the addressId in the payload
  const addressDataWithId = {
    addressId: this.address.addressId, // Include the addressId
    buildingName: this.address.buildingName,
    streetNumber: this.address.streetNumber,
    streetName: this.address.streetName,
    surbub: this.address.surbub,
    city: this.address.city,
    province: this.address.province,
    country: this.address.country,
    zipCode: this.address.zipCode
  };

  this.authService.updateaddress(addressDataWithId).subscribe(
    (data) => {
      console.log('Address updated successfully:', data);
      this.loadAddress(data.addressId);
      this.snackBar.open('Your profile has been updated successfully', 'Close', { duration: 3000 });
    },
    (error) => {
      console.error('Error updating address:', error);
    }
  );
}

}