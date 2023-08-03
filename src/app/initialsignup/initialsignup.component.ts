import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initialsignup } from '../models/initialsignup.model';
import { SharedService } from '../shared.service';
import { AuthService } from '../services/auth.service';

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
  InitialSignUp = new initialsignup();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
    ) {}

    register(InitialSignUp: initialsignup) {
      this.authService.register(InitialSignUp).subscribe();
    }

  // addInitialSignupRequest: initialsignup = {
  //   Account_UserId: '',
  //   email: '',
  //   password: '',
  //   accountType: ''
  // };
  
  roles: roles[] = [
    { value: 'ClaimsAgent', viewValue: 'Claims agent' },
    { value: 'ServiceProvider', viewValue: 'Service provider' },
  ];

  signupSuccess: boolean = false;

  visible: boolean = true;
  changetype:boolean =true;

  confirmVisible: boolean = true;
  confirmChangetype: boolean = true;

  ngOnInit(): void {
    this.userregister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]],
      confirmPassword: ['', Validators.required],
      accountType: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  hideShowPass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  hideShowConfirmPass() {
    this.confirmVisible = !this.confirmVisible;
    this.confirmChangetype = !this.confirmChangetype;
  }

  handleSubmit(): void {
    if (this.userregister.valid) {
      this.register(this.InitialSignUp)
    // this.addInitialSignupRequest.Account_UserId = ''; // Set the Account_UserId property
    // this.addInitialSignupRequest.email = this.userregister.value.email; // Set the email property
    // this.addInitialSignupRequest.password = this.userregister.value.password; // Set the password property
    // this.addInitialSignupRequest.accountType = this.userregister.value.accountType;

    //   this.sharedService.addInitialSignup(this.addInitialSignupRequest).subscribe(
    //    (response: any) => {
    //     console.log(response);
    //     this.userregister.reset();
    //     this.signupSuccess = true;
    //    },
    //    (error: any) => {
    //     console.log(error);
    //   }
    //  );
    // } else {
    //   console.log('Form is invalid. Please fill in all required fields.');
    // }

    
  }
}

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mustMatch: true };
    }
  
    return null;
  }
}



