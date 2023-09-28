import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { changePassword } from 'src/app/models/changePassword.model';


import ValidateForm from 'src/app/helpers/validationform';
import { Router } from '@angular/router';
import { notificationPreferences } from 'src/app/models/notificationPreferences';

interface NotificationPreferences {
  [key: string]: boolean;
}

@Component({
  selector: 'app-ca-profile',
  templateUrl: './ca-profile.component.html',
  styleUrls: ['./ca-profile.component.css']
})

export class CaProfileComponent implements OnInit {
  userProfile: any; 
  userNotifi: any;
  splitValues: string[] = [];
  chanegPasswordForm!: FormGroup;
  changePassswordObj = new changePassword();
  notificationPreferObj = new notificationPreferences();
  




  constructor(
    private resetService: ResetPasswordService,
    private authService: AuthService,
     private snackBar: MatSnackBar,
     private router: Router,
     private snackbar: MatSnackBar,

     private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getcaprofile();
    this.pushNotifications();
   // this.checkEmailVerification();
    this.chanegPasswordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', '', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]], 
        confirmPassword: ['', Validators.required]

      }

    )
  }

  checkEmailVerification(){
    console.log('checkEmailVerification called');
    console.log(this.userProfile.email)
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

  getcaprofile(): void {
    this.authService.getcaprofile().subscribe(
      (response) => {
        console.log(response)
        this.userProfile = response.data;
        this.checkEmailVerification()
       
        //console.log(response.id);
        console.log('Claim Agent Profile', this.userProfile);
       

      }, 
      (error) => {
        console.log('Error returning claim agent profile', error);
      }
    );
  }



  updateProfile() {
    this.authService.updatecadetails(this.userProfile).subscribe(
      (data) => {
        console.log('Profile updated successfully:', data);
        this.getcaprofile();
        this.snackBar.open('Your profile has been updated successfully', 'Close', {duration: 3000});
      },
      (error) => {
        console.error('Error updating profile:', error);

      }
    );
  }

  changePassword(){
      this.authService.getcaprofile().subscribe(
        (response) => {
          console.log(response)
          this.userProfile = response.data;
          console.log(this.userProfile);

          var idNum = this.userProfile.account_UserId;
      //    console.log(idNum);

          this.changePassswordObj.id = this.userProfile.account_UserId;
          //console.log(idNum);


         // console.log(this.changePassswordObj.id)
          console.log(this.changePassswordObj)

          this.resetService.changePassword(this.changePassswordObj)
          .subscribe({
            next: (res)=>{
              console.log("API ts",this.changePassswordObj)
              this.snackbar.open('Success! Password reset successfully', 'Close', { duration: 4000 });
    
              this.router.navigate(['/ca-profile']);
            },
            error: (err)=>{
              this.snackbar.open('Error! Something went wrong', 'Close', { duration: 4000 });
            }
          })

          console.log('Claim Agent Profile', this.userProfile);
         
        }, 
        (error) => {
        }
      );  
   
  }


  pushNotifications() {

    this.authService.getcaprofile().subscribe(
      (response) => {
        console.log(response)
        this.userProfile = response.data;
        console.log(this.userProfile);

        var idNum = this.userProfile.account_UserId;
        console.log(idNum);

        this.notificationPreferObj.id = this.userProfile.account_UserId;
        //console.log(idNum);


        console.log(this.notificationPreferObj.id)
        console.log(this.notificationPreferObj)

        this.authService.pushNotifications(this.userProfile.account_UserId)
        .subscribe({
          next: (res)=>{
            console.log(res.data)
            this.splitValues = res.data.split(', ');

        // Optionally, you can log the result
        console.log(this.splitValues);

        if (this.splitValues[0].trim() === 'True'){
          const firstValue = true 
          this.notificationPreferObj.changesToAccounts = firstValue
        } else {
          const firstValue = false
        }

        if (this.splitValues[1].trim() === 'True'){
          const secondValue = true 
          this.notificationPreferObj.newAuctions = secondValue
        } else {
          const secondValue = false
        }

        if (this.splitValues[2].trim() === 'True'){
          const thirdValue = true 
          this.notificationPreferObj.marketingPromo = thirdValue
        } else {
          const thirdValue = false
        }

  
            this.router.navigate(['/ca-profile']);
          },
          error: (err)=>{
          //  this.snackbar.open('Error! Notifications not pushed', 'Close', { duration: 4000 });
          }
        })

        //console.log(response.id);
        console.log('Claim Agent Profile', this.userProfile);
       

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

    this.authService.getcaprofile().subscribe(
      (response) => {
        console.log(response)
        this.userProfile = response.data;
        console.log(this.userProfile);

        var idNum = this.userProfile.account_UserId;
        console.log(idNum);

        this.notificationPreferObj.id = this.userProfile.account_UserId;
        //console.log(idNum);


        console.log(this.notificationPreferObj.id)
        console.log(this.notificationPreferObj)

        this.authService.saveSettings(this.notificationPreferObj)
        .subscribe({
          next: (res)=>{
            console.log(this.changePassswordObj)
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
       // console.log('Error returning claim agent profile', error);
      }
    );
    // Save user settings to the service

  }
}