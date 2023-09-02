import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initialsignup } from '../models/initialsignup.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  InitialSignUp: initialsignup = new initialsignup();

  roles: roles[] = [
    { value: 'ClaimsAgent', viewValue: 'Claims agent' },
    { value: 'ServiceProvider', viewValue: 'Service provider' },
  ];
  snackBar: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    ) {}

    register(InitialSignUp: initialsignup) {
      this.authService.register(InitialSignUp).subscribe();
    }

    ngOnInit(): void {
      this.userregister = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]],
        confirmPassword: ['', Validators.required],
        accountType: ['', Validators.required],
      }, { validator: this.passwordMatchValidator });
    }

  // addInitialSignupRequest: initialsignup = {
  //   Account_UserId: '',
  //   email: '',
  //   password: '',
  //   accountType: ''
  // };


  visible: boolean = true;
  changetype: boolean = true;

  confirmVisible: boolean = true;
  confirmChangetype: boolean = true;

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

      const email = this.userregister.value.email;
      const password = this.userregister.value.password;
      const accountType = this.userregister.value.accountType;

      const newInitialSignUp: initialsignup = {
        email: email,
        password: password,
        accountType: accountType,
      }

      this.authService.register(newInitialSignUp).subscribe(
        response => {
          console.log(response);
          let route: string;
          localStorage.setItem("authToken",JSON.stringify(response))
          if (accountType === 'ClaimsAgent') {
            route = '/casignup';
          } else if (accountType === 'ServiceProvider') {
            route = '/signup';
          } else {
            console.error('Invalid account type');
            return;
          }
          this.router.navigate([route]);
        },
        error => {
          console.error(error);
        }
      );
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



