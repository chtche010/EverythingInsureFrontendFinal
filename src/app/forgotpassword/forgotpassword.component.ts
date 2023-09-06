import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordService } from '../services/reset-password.service';
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
  private resetService: ResetPasswordService
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
      this.dialogRef.close();
      console.log("success");
    }, 
    error:(err)=>{
      console.log(err);
    }
  })
 
}
}
