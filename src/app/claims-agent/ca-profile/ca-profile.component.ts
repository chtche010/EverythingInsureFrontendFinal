import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ca-profile',
  templateUrl: './ca-profile.component.html',
  styleUrls: ['./ca-profile.component.css']
})
export class CaProfileComponent implements OnInit {
  userProfile: any; 
  chanegPasswordForm!: FormGroup;


  constructor(private authService: AuthService,
     private snackBar: MatSnackBar,
     private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getcaprofile();
    this.chanegPasswordForm = this.fb.group([
      //currentPassword: ['', Validators.required],   
      //newPassword: ['', Validators.required],   
      //confirmPassword: ['', Validators.required],
      
      

    ])
  }

  getcaprofile(): void {
    this.authService.getcaprofile().subscribe(
      (response) => {
        console.log(response)
        this.userProfile = response.data;
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
}