import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../models/resetPassword.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  passwordVisible: boolean = true;
  authService: any;

  constructor(private fb: FormBuilder){ }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  
  hideShowPass() {
    this.passwordVisible = !this.passwordVisible;
  }

  handleSubmit() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      const password = this.resetPasswordForm.value.password;

      const loginObject = {
        email,
        password,
        accountType: '' // Add the accountType property here
      };


      // this.authService.login(loginObject).subscribe(
      //   response => {
      //     // Handle successful login
      //     console.log(response);
      //     localStorage.setItem("authToken", JSON.stringify(response))
      //     // Redirect to the appropriate page based on the user's role or perform any other actions
      //     const decodedToken = this.jwtHelper.decodeToken(response.data);
      //     console.log(decodedToken);
      //     if (decodedToken.role === 'Administrator') {
      //       this.router.navigate(['/adminprofile']);
      //     } else if (decodedToken.role === 'ServiceProvider') {
      //       this.router.navigate(['/serviceproviderprofile']);
      //     } else if (decodedToken.role === 'ClaimsAgent') {
      //       this.router.navigate(['/caprofile']);
      //     } else {
      //       this.router.navigate(['/login']);
      //     }
      //   },
      //   error => {
      //     // Handle login error
      //     console.error(error);
      //     // Display an error message to the user or perform any other actions
      //   }
      
    }
  }
}


