import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
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
      // console.log(this.loginForm.value)
      // Send the obj to database 
      this.sharedService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log('Form is invalid. Please enter valid email and password.');
    }
  }
}
