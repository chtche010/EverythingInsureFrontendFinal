import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordService } from '../services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';
import { MatSnackBar } from '@angular/material/snack-bar';

//put API service here
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
forgotPasswordForm!: FormGroup;

constructor(
  private dialogRef: MatDialogRef<ForgotpasswordComponent>, 
  private resetService: ResetPasswordService,
  private snackbar: MatSnackBar
  
  ){}

ngOnInit(): void {
  this.forgotPasswordForm = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email])
  });
}

sendResetLink(): void {
  const email = this.forgotPasswordForm.get('email')?.value ?? '';
  console.log(email);

  const encodedEmail = encodeURIComponent(email);
  const url = 'http://localhost:5184/Auth/sendResetEmail/${encodedEmail}'



  this.resetService.sendResetPaswordLink(email)
  .subscribe({
    next:(res)=>{
      this.snackbar.open('Success! Reset email password reset!', 'Close', { duration: 4000 });
      this.dialogRef.close();

      console.log("success");
    }, 
    error:(err)=>{
      this.snackbar.open('Error! Something went wrong!', 'Close', { duration: 4000 });

      console.log(err);
    }
  })
 
}
}
