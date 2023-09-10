import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opt',
  templateUrl: './opt.component.html',
  styleUrls: ['./opt.component.css']
})
export class OptComponent {
 otpFrom!: FormGroup;

 constructor( private authService: AuthService,
  private router: Router,
  ){
 


 }

 ngOnInit(): void {
  this.otpFrom = new FormGroup({
    'otp' : new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
  });
}

verifyOTP(): void {
  const otp = this.otpFrom.get('otp')?.value ?? '';
  console.log(otp);

  this.authService.verifyOTP(otp)
  .subscribe({
    next: (res) => {
      this.router.navigate(['/caprofile']);

    },
    error:(err)=>{
      console.log(err);
    }
  })

 // const encodedEmail = encodeURIComponent(otp);
 // const url = 'http://localhost:5184/Auth/sendResetEmail/${encodedEmail}'




 
}
 
}
