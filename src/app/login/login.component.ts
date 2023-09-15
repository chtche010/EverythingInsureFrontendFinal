import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../helpers/validationform';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { initialsignup } from '../models/initialsignup.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  email = "";
  loginForm!: FormGroup;
  passwordVisible: boolean = true;
  //InitialSignUp = new initialsignup();

  constructor(
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
   // private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.email = this.authService.parseEmail(this.email);

  }

  hideShowPass() {
    this.passwordVisible = !this.passwordVisible;
  }

  openForgotPasswordDialog(): void{
    const dialogRef = this.dialog.open(ForgotpasswordComponent , {
      width: '40%',
      enterAnimationDuration: '500ms',});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //can do something here for after the dialog is closed.
    });
  }
  
  handleSubmit() {
    if (this.loginForm.valid) {
      const email = this.authService.parseEmail(this.loginForm.value.email);
      const password = this.loginForm.value.password;

      console.log(email);

      const loginObject = {
        email,
        password,
        accountType: '' // Add the accountType property here
      };


      this.authService.login(loginObject).subscribe(
        response => {
          // Handle successful login
          console.log(response);
          localStorage.setItem("authToken", JSON.stringify(response));
          // Redirect to the appropriate page based on the user's role or perform any other actions
          const decodedToken = this.jwtHelper.decodeToken(response.data);
          console.log(decodedToken);

          if (decodedToken.role === 'Administrator') {
            this.snackbar.open('Email verfication sent!', 'Close', { duration: 4000 });
            this.router.navigate(['/adminprofile']);
          } else if (decodedToken.role === 'ServiceProvider') {
            //this.snackbar.open('Email verfication sent!', 'Close', { duration: 4000 });
            this.router.navigate(['/serviceproviderprofile']);
          } else if (decodedToken.role === 'ClaimsAgent') {
            this.authService.sendOTPEmail(email)
            .subscribe({
              next: (res) => {
                this.snackbar.open('Success! OTP email sent, it will expire in 15 minutes!', 'Close', { duration: 4000 });

                this.router.navigate(['/opt']);

              },
              error:(err)=>{
                this.snackbar.open('Error! Something went wrong', 'Close', { duration: 4000 });

                console.log(err);
              }
            })
           
          } else {
            this.router.navigate(['/login']);
          }
        },
        error => {
          // Handle login error
          console.error(error);
          const errorMessage = "Invalid login credentials";
          // Display an error message to the user
          this.toast.error({ detail: 'Error', summary: errorMessage, duration: 5000 });
        }
      );
    }
  }
}
