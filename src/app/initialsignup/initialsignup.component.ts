// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {FormsModule} from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {NgFor} from '@angular/common';
// import {MatSelectModule} from '@angular/material/select';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { initialsignup } from '../Models/initialsignup.model';

// interface roles {
//   value: string;
//   viewValue: string;
// }

// @Component({
//   selector: 'app-initialsignup',
//   templateUrl: './initialsignup.component.html',
//   styleUrls: ['./initialsignup.component.css'], 
// })

// export class InitialsignupComponent implements OnInit {
//   userregister!: FormGroup;
//   roles: roles[] = [
//     {value: 'Administrator-0', viewValue: 'Administrator'},
//     {value: 'ClaimsAgent-1', viewValue: 'Claims agent'},
//     {value: 'ServiceProvider-2', viewValue: 'Service provider'}
//   ];

// // Bind the form to a module 
//   // initialSignupRequest: initialsignup = {
//   //   Account_UserId: '',
//   //   username: '',
//   //   email: '',
//   //   password: '',
//   //   accountType: '',
//   // };

//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit(): void {
//     this.userregister = this.formBuilder.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//       username: ['', Validators.required],
//       accountType: ['', Validators.required],
//     });
//   }

//   // initialSignup() {
//   //   console.log(this.initialSignupRequest);
//   // }

//   handleSubmit(): void {
//     if (this.userregister.valid) {
//       console.log(this.userregister.value);
//     }
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initialsignup } from '../models/initialsignup.model';
import { SharedService } from '../shared.service';

interface roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-initialsignup',
  templateUrl: './initialsignup.component.html',
  styleUrls: ['./initialsignup.component.css'],
})

export class InitialsignupComponent implements OnInit {
  userregister!: FormGroup;
  addInitialSignupRequest: initialsignup = {
    Account_UserId: '',
    email: '',
    password: '',
    accountType: ''
  };
  
  roles: roles[] = [
    { value: 'Administrator', viewValue: 'Administrator' },
    { value: 'ClaimsAgent', viewValue: 'Claims agent' },
    { value: 'ServiceProvider', viewValue: 'Service provider' },
  ];

  signupSuccess: boolean = false;

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.userregister = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      accountType: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  handleSubmit(): void {
    if (this.userregister.valid) {

    this.addInitialSignupRequest.Account_UserId = ''; // Set the Account_UserId property
    this.addInitialSignupRequest.email = this.userregister.value.email; // Set the email property
    this.addInitialSignupRequest.password = this.userregister.value.password; // Set the password property
    this.addInitialSignupRequest.accountType = this.userregister.value.accountType;

      this.sharedService.addInitialSignup(this.addInitialSignupRequest).subscribe(
       (response: any) => {
        console.log(response);
        this.userregister.reset();
        this.signupSuccess = true;
       },
       (error: any) => {
        console.log(error);
      }
     );
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}

