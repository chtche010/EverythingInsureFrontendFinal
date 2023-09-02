import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//put API service here
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
forgotPasswordForm!: FormGroup;

ngOnInit(): void {
  this.forgotPasswordForm = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email])
  });
}

sendResetLink(): void {
  const email = this.forgotPasswordForm.get('email')?.value ?? '';
   // Implement the logic to send the reset link to the user's email.
     // This typically involves calling a service method that sends a HTTP request to your server.
}
}
