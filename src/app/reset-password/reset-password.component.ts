import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../models/resetPassword.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../helpers/confirmPassword.validator';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from '../helpers/validationform';
import { ResetPasswordService } from '../services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToken2!: string;
  emailToReset!: string;
  resetPasswordObj = new ResetPassword();
  passwordVisible: boolean = true;
  authService: any;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private activateRoute : ActivatedRoute, 
    private resetService: ResetPasswordService,
    private toast: NgToastService,
    private snackbar: MatSnackBar
    ){ }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]],
      confirmPassword: [null, Validators.required]
    }, {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });

    this.activateRoute.queryParams.subscribe(val=>{
      this.emailToReset= val['email'];
      let uriToken = val['code'];


      this.emailToken2 = uriToken.replace(/ /g,'+')
      console.log(this.emailToken2);
      console.log(this.emailToReset);
    })
  }

  reset (){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken2;


      console.log(this.resetPasswordObj)
      //console.log('Reset Password Object:', this.resetPasswordObj);
      //this works


      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next: (res)=>{
          console.log(this.resetPasswordObj)
          this.snackbar.open('Success! Password reset successfully', 'Close', { duration: 4000 });

          this.router.navigate(['/login']);
        },
        error: (err)=>{
          this.snackbar.open('Error! Something went wrong', 'Close', { duration: 4000 });
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
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

      
    }
  }

  


}


