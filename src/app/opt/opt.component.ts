import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-opt',
  templateUrl: './opt.component.html',
  styleUrls: ['./opt.component.css']
})
export class OptComponent {
  email = "";
 otpFrom!: FormGroup;

 constructor( private authService: AuthService,
  private router: Router,
  private snackbar: MatSnackBar
  ){
 
 }

 ngOnInit(): void {
  this.otpFrom = new FormGroup({
    'otp' : new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
  });
  this.email = this.authService.parseEmail(this.email);


}

verifyOTP(): void {
  const otp = this.otpFrom.get('otp')?.value ?? '';
  console.log(otp);

  this.authService.verifyOTP(otp)
  .subscribe({
    next: (res) => {
      this.snackbar.open('Success! OTP correct', 'Close', { duration: 4000 });

      this.router.navigate(['/caprofile']);

    },
    error:(err)=>{
      this.snackbar.open('Error! OTP invalid', 'Close', { duration: 4000 });

      console.log(err);
    }
  })

}

resendOTP() : void {

  const email = this.authService.parseEmail(this.email)
  console.log(email);
  this.authService.sendOTPEmail(email)
            .subscribe({
              next: (res) => {
              //this.router.navigate(['/opt']);

              },
              error:(err)=>{
                console.log(err);
              }
            })
}
 
}
