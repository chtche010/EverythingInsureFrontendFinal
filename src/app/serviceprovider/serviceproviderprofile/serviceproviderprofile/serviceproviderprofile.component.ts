import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { changePasswordEmail } from 'src/app/models/changePasswordEmail.model';
import { notificationPreferencesEmail } from 'src/app/models/notificationPreferencesEmail';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-serviceproviderprofile',
  templateUrl: './serviceproviderprofile.component.html',
  styleUrls: ['./serviceproviderprofile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceproviderprofileComponent implements OnInit {
  userProfile: any;
  address: any;
  email = "";
  userNotifi: any;
  splitValues: string[] = [];
  chanegPasswordForm!: FormGroup;
  changePasswordEmailObj = new changePasswordEmail();
  notificationPreferEmailObj = new notificationPreferencesEmail();
  

  constructor(
    private resetService: ResetPasswordService,
    private authService: AuthService,
      private snackBar: MatSnackBar,
      private router: Router,
      private snackbar: MatSnackBar,
      private fb: FormBuilder

  ){}

  serviceProviderId!: number;
  addressId!: number;

  ngOnInit(): void {
    this.loadUserProfile();
    this.pushNotifications();
    this.checkEmailVerification();   
    this.loadAddress(this.address);
    this.chanegPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
    
  }

  checkEmailVerification(){
    this.authService.checkVeri(this.userProfile.email).subscribe(
      (repsonse) => {
        console.log(repsonse.success)
        if(repsonse.success === false){
          this.snackbar.open('Error! Please verify your email', 'Close', { duration: 4000 });
        }
      },
      (error) => {
        console.log('1111', error);
        this.snackbar.open('Error! Something went wrong(EmailVeri)', 'Close', { duration: 4000 });
      }
    )
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

changePassword(){

      this.changePasswordEmailObj.email = this.userProfile.email;
    
      

      this.resetService.changePasswordEmail(this.changePasswordEmailObj)
      .subscribe({
        next: (res)=>{
          console.log("API ts",this.changePasswordEmailObj)
          this.snackbar.open('Success! Password reset successfully', 'Close', { duration: 4000 });

          this.router.navigate(['/ca-profile']);
        },
        error: (err)=>{
          console.log("API ts",this.changePasswordEmailObj)

          this.snackbar.open('Error! Something went wrong', 'Close', { duration: 4000 });
        }
      })

      console.log('Claim Agent Profile', this.userProfile);
  

  }


pushNotifications() {
this.authService.getspdetails().subscribe(
  (response) => {
    console.log(response)
    this.userProfile = response.data;
    console.log(this.userProfile);

    var email = this.userProfile.email;

    this.notificationPreferEmailObj.email = this.userProfile.email;

    console.log(this.notificationPreferEmailObj.changesToAccounts)
    console.log(this.notificationPreferEmailObj.newAuctions)
    console.log(this.notificationPreferEmailObj.marketingPromo)



    this.authService.pushNotificationsEmail(this.userProfile.email)
    .subscribe({
      next: (res)=>{
        console.log("push notification", res.data)
       // console.log(res.data)        
        this.splitValues = res.data.split(', ');

    // Optionally, you can log the result
    console.log(this.splitValues);

    if (this.splitValues[0].trim() === 'True'){
      const firstValue = true 
      this.notificationPreferEmailObj.changesToAccounts = firstValue
    } else {
      const firstValue = false
    }

    console.log(this.notificationPreferEmailObj.changesToAccounts)


    if (this.splitValues[1].trim() === 'True'){
      const secondValue = true 
      this.notificationPreferEmailObj.newAuctions = secondValue

    } else {
      const secondValue = false
    }

    console.log(this.notificationPreferEmailObj.newAuctions)


    if (this.splitValues[2].trim() === 'True'){
      const thirdValue = true 
      this.notificationPreferEmailObj.marketingPromo = thirdValue

    } else {
      const thirdValue = false
    }

    console.log(this.notificationPreferEmailObj.marketingPromo)



        this.router.navigate(['/serviceproviderprofile']);
      },
      error: (err)=>{
      //  this.snackbar.open('Error! Notifications not pushed', 'Close', { duration: 4000 });
      }
    })

    //console.log(response.id);
    console.log('Service Provider Profile', this.userProfile);
   

  }, 
  (error) => {
   // console.log('Error returning claim agent profile', error);
  }
);
// Save user settings to the service
}

splitStringWithCommas(data: string) {
// Split the string and store the result in the splitValues array
this.splitValues = data.split(', ');

// Optionally, you can log the result
console.log(this.splitValues);
}

saveSettings() {
this.authService.getspdetails().subscribe(
  (response) => {
    console.log(response)
    this.userProfile = response.data;
    console.log(this.userProfile);

    var email = this.userProfile.email;

    this.notificationPreferEmailObj.email = email;

    console.log(this.notificationPreferEmailObj)

    this.authService.saveSettingsEmail(this.notificationPreferEmailObj)
    .subscribe({
      next: (res)=>{
        console.log(this.notificationPreferEmailObj)
        this.snackbar.open('Success! Notification settings updated', 'Close', { duration: 4000 });

        this.router.navigate(['/ca-profile']);
      },
      error: (err)=>{
        this.snackbar.open('Error! Something went wrong', 'Close', { duration: 4000 });
      }
    })

    //console.log(response.id);
    console.log('Claim Agent Profile', this.userProfile);
   
  }, 
  (error) => {

  }
);

}

}