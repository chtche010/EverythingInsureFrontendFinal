import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../helpers/validationform';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { initialsignup } from '../models/initialsignup.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible: boolean = true;
  InitialSignUp = new initialsignup();

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private router: Router, 
    private authService: AuthService
    ) {}

  login(InitialSignUp: initialsignup) {
    this.authService.login(InitialSignUp).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.passwordVisible = !this.passwordVisible;
  }

  handleSubmit(){
    this.login(this.InitialSignUp);
  }

// async handleSubmit() {
//   // Prepare the login data
//   const loginObj = {
//     // Add your login data properties here
//     username: 'your-username',
//     password: 'your-password'
//   };

//   try {
//     // Call the login method in the SharedService with the login data
//     const response = await this.sharedService.login(loginObj).toPromise(); // Convert observable to promise

//     const token = response.token;
//     // Store the token in local storage
//     localStorage.setItem('token', token);
//     // Set the user payload in the shared service
//     this.sharedService.setUserPayload(token);
//     // Redirect to the appropriate page
//     const accountUserId = this.sharedService.getAccountUserIdFromToken();
//     const accountType = this.sharedService.getaccountTypeFromToken();
//     if (accountUserId) {
//       // User is logged in and has an account ID
//       if (accountType === 'administrator') {
//         this.router.navigate(['/adminprofile']);
//       } else if (accountType === 'serviceprovider') {
//         this.router.navigate(['/serviceproviderprofile']);
//       } else if (accountType === 'ClaimsAgent') {
//         this.router.navigate(['/claimsagentprofile']);
//       } else {
//         // Handle the case where accountType is neither administrator, serviceprovider, nor ClaimsAgent
//         // You can decide where to redirect them in this case (e.g., back to the login page)
//         this.router.navigate(['/login']);
//       }
//     } else {
//       // User is logged in but does not have an account ID
//       if (accountType === 'ClaimsAgent') {
//         this.router.navigate(['/casignup']);
//       } else if (accountType === 'serviceprovider') {
//         this.router.navigate(['/spsignup']);
//       } else {
//         // Handle the case where accountType is neither ClaimsAgent nor serviceprovider
//         // You can decide where to redirect them in this case (e.g., back to the login page)
//         this.router.navigate(['/login']);
//       }
//     }
//   } catch (error) {
//     // Handle error if login fails (e.g., show an error message to the user)
//     console.error('Login error:', error);
//     // You can also redirect to an error page or show an error message to the user
//   }
// }


}


  
