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
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const loginObject = {
        email,
        password,
        accountType: '' // Add the accountType property here
      };


      this.authService.login(loginObject).subscribe(
        response => {
          // Handle successful login
          console.log(response);
          localStorage.setItem("authToken", JSON.stringify(response))
          // Redirect to the appropriate page based on the user's role or perform any other actions
          const decodedToken = this.jwtHelper.decodeToken(response.data);
          console.log(decodedToken);
          if (decodedToken.role === 'Administrator') {
            this.router.navigate(['/adminprofile']);
          } else if (decodedToken.role === 'ServiceProvider') {
            this.router.navigate(['/serviceproviderprofile']);
          } else if (decodedToken.role === 'ClaimsAgent') {
            this.router.navigate(['/caprofile']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error => {
          // Handle login error
          console.error(error);
          // Display an error message to the user or perform any other actions
        }
      );
    }
  }
}
