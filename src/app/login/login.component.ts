import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../helpers/validationform';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { initialsignup } from '../models/initialsignup.model';
import { JwtHelperService } from '@auth0/angular-jwt'

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
    private jwtHelper : JwtHelperService
    ) {}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }

    hideShowPass() {
      this.passwordVisible = !this.passwordVisible;
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

  // login(InitialSignUp: initialsignup) {
  //   this.authService.login(InitialSignUp).subscribe((token: string) => {
  //     localStorage.setItem('authToken', token);
  //     const decodedToken = this.jwtHelper.decodeToken(token);
  //     if (decodedToken.role === 'Administrator'){
  //       this.router.navigate(['/adminprofile']);
  //     } else if (decodedToken.role === 'ServiceProvider'){
  //       this.router.navigate(['/serviceproviderprofile'])
  //     } else if (decodedToken.role === 'ClaimsAgent'){
  //       this.router.navigate(['/caprofile']);
  //     } else {
  //       this.router.navigate(['/signup'])
  //     }
  //   });
  // }

  this.authService.login(loginObject).subscribe(
    response => {
      // Handle successful login
      console.log(response);
      // Redirect to the appropriate page based on the user's role or perform any other actions
      const decodedToken = this.jwtHelper.decodeToken(response.token);
      if (decodedToken.accountType === 'Administrator') {
        this.router.navigate(['/adminprofile']);
      } else if (decodedToken.accountType === 'ServiceProvider') {
        this.router.navigate(['/serviceproviderprofile']);
      } else if (decodedToken.accountType === 'ClaimsAgent') {
        this.router.navigate(['/caprofile']);
      } else {
        this.router.navigate(['/signup']);
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
