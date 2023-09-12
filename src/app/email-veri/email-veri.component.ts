import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { verifyEmail } from '../models/verifyEmail.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-email-veri',
  templateUrl: './email-veri.component.html',
  styleUrls: ['./email-veri.component.css']
})
export class EmailVeriComponent {

  emailToken!: string;
  emailToVerify!: string;
  verifyEmailObj = new verifyEmail();
 



  constructor (
    private activateRoute : ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private resetService: ResetPasswordService,
    private authService: AuthService,
 
    ){ }

  ngOnInit(): void {

    

    this.activateRoute.queryParams.subscribe(val=>{
      this.emailToVerify= val['email'];
      let uriToken = val['code'];


      this.emailToken = uriToken.replace(/ /g, '+')
      console.log(this.emailToken);
      console.log(this.emailToVerify);
    })

    this.verifyEmailObj.email = this.emailToVerify;
    this.verifyEmailObj.emailVeriToken = this.emailToken;

    this.authService.verifyEmail(this.verifyEmailObj)
    .subscribe({
      next: (res)=>{
        console.log(this.verifyEmailObj)
        this.snackbar.open('Success! Email Verified', 'Close', { duration: 4000 });

        this.router.navigate(['/home']);
      },
      error: (err)=>{
        this.snackbar.open('Error! Something went wrong', 'Close', { duration: 4000 }); 

      }
    })

   
  
  }

  // verifyEmail(){

  //   this.verifyEmailObj.email = this.emailToVerify;
  //   this.verifyEmailObj.emailVeriToken = this.emailToken;
  //   var obejct = this.verifyEmailObj;

  //   console.log(this.verifyEmailObj)

  //   this.authService.verifyEmail(obejct)
  //   .subscribe({
  //     next: (res)=>{
  //       console.log(this.verifyEmailObj)
  //       this.snackbar.open('Success! PEmailed verifed', 'Close', { duration: 4000 });

  //       this.router.navigate(['/login']);
  //     },
  //     error: (err)=>{
  //       this.snackbar.open('Error! Something went wrong', 'Close', { duration: 4000 });

        

  //     }
  //   })
  // }

  




}
