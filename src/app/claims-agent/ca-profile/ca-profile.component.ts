import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { changePassword } from 'src/app/models/changePassword.model';
import ValidateForm from 'src/app/helpers/validationform';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ca-profile',
  templateUrl: './ca-profile.component.html',
  styleUrls: ['./ca-profile.component.css']
})

export class CaProfileComponent implements OnInit {
  userProfile: any; 
  chanegPasswordForm!: FormGroup;
  changePassswordObj = new changePassword();
  //changePassswordObj.id = number=0;



  constructor(
    private resetService: ResetPasswordService,
    private authService: AuthService,
     private snackBar: MatSnackBar,
     private router: Router,
     private snackbar: MatSnackBar,

     private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getcaprofile();
    this.chanegPasswordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', '', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]], 
        confirmPassword: ['', Validators.required]

      }

    )
  }

  getcaprofile(): void {
    this.authService.getcaprofile().subscribe(
      (response) => {
        console.log(response)
        this.userProfile = response.data;
       
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
          console.log(idNum);

          this.changePassswordObj.id = this.userProfile.account_UserId;
          //console.log(idNum);


          console.log(this.changePassswordObj.id)
          console.log(this.changePassswordObj)

          this.resetService.changePassword(this.changePassswordObj)
          .subscribe({
            next: (res)=>{
              console.log(this.changePassswordObj)
              this.snackbar.open('Success! Password reset successfully', 'Close', { duration: 4000 });
    
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
      

   

    
   
  }
}