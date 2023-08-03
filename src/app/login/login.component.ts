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


  handleSubmit(): void {
  if (this.loginForm.valid) {
    // Implement login logic here, e.g., send login request to server
    console.log(this.loginForm.value)
    // Send the obj to database 
    this.sharedService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res.message);
        this.loginForm.reset();
        this.sharedService.storeToken(res.token);

        // const tokenPayload = this.sharedService.decodeToken();
        // this.userStore.setusernameForStore(tokenpayload.name);
        // this.userStore.setaccountTypeForStore(tokenpayload.accountType);
        // this.userStore.setemailForStore(tokenpayload.email);
        
        this.toast.success({detail:"Success", summary:res.message, duration: 5000});
        this.router.navigate(['/serviceproviderprofile'])
      },
      error: (err) => {
        this.toast.error({detail:"Error", summary:"Something went wrong!", duration: 5000});
        console.log(err);
      },
    });
  } else {
    ValidateForm.validateAllFormFields(this.loginForm);
  }
}
}
  
