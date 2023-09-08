import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../models/resetPassword.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../helpers/confirmPassword.validator';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from '../helpers/validationform';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToken!: string;
  emailToReset!: string;
  resetPasswordObj = new ResetPassword();
  passwordVisible: boolean = true;
  authService: any;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private activateRoute : ActivatedRoute, 
    private resetService: ResetPasswordService){ }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });

    this.activateRoute.queryParams.subscribe(val=>{
      this.emailToReset= val['email'];
      let uriToken = val['code'];


      this.emailToken = uriToken.replace(/ /g, '+')
      console.log(this.emailToken);
      console.log(this.emailToReset);
    })
  }

  reset (){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      console.log(this.resetPasswordObj)
      //this works


      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next: (res)=>{
          console.log(this.resetPasswordObj)
          this.router.navigate(['/login']);
        },
        error: (err)=>{

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


