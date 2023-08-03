import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../helpers/validationform';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private router: Router, 
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

// Method to handle form submission
handleSubmit() {
  if (this.loginForm.invalid) {
    return;
  }

  const loginObj = {
    email: this.loginForm.get('email')!.value,
    password: this.loginForm.get('password')!.value
  };

  this.sharedService.login(loginObj).subscribe(
    (response) => {
      // On successful login, store the token and redirect to profile page
      this.sharedService.storeToken(response.token);
      this.redirectToProfilePage();
    },
    (error) => {
      // Handle login errors (e.g., invalid credentials)
      console.error('Login Error:', error);
      // You can display error messages to the user if needed
    }
  );
}

// Helper method to redirect to profile page after successful login
redirectToProfilePage() {
  // Implement the logic to redirect to the appropriate profile page
  // For example, based on the user's role or profile status
  // You can use the AuthGuard to handle the redirection based on the user's status
  // For now, let's assume you have a generic profile page for all users
  const accountType = this.sharedService.getaccountTypeFromToken();
  if (accountType === 'Administrator') {
    this.redirectToAdminProfile();
  } else if (accountType === 'ClaimsAgent') {
    this.redirectToClaimsAgentProfile();
  } else if (accountType === 'ServiceProvider') {
    this.redirectToServiceProviderProfile();
  } else {
    // Handle the case where accountType is not recognized
    // You can decide where to redirect them in this case (e.g., back to the login page)
    this.router.navigate(['/login']);
  }
}

// Helper method to redirect to the claims agent profile page
redirectToClaimsAgentProfile() {
  this.router.navigate(['/caprofile']);
}

// Helper method to redirect to the service provider profile page
redirectToServiceProviderProfile() {
  this.router.navigate(['/serviceproviderprofile']);
}

// Helper method to redirect to the admin profile page
redirectToAdminProfile() {
  this.router.navigate(['/adminprofile']);
}
}
  
