import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedService } from '../shared.service';
import { addclaimsagent } from '../models/claimagent/addclaimsagent';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-claimsagentsignup',
  templateUrl: './claimsagentsignup.component.html',
  styleUrls: ['./claimsagentsignup.component.css']
})
export class ClaimsagentsignupComponent implements OnInit {
  caregister!: FormGroup;
  addClaimsAgentRequest: addclaimsagent = {
    //claimsAgentId: '',
    insuranceCompany: '',
    firstName: '', 
    lastName: '' 
  };

  signupSuccess: boolean = false;
  snackBar: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.caregister = this.formBuilder.group({
      insuranceCompany: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  handleSubmit() {
    if (this.caregister.valid) {
      const newCA: addclaimsagent = { 
        firstName: this.caregister.value.firstName,
        lastName: this.caregister.value.lastName,
        insuranceCompany: this.caregister.value.insuranceCompany,
      };

      console.log(newCA)
  
      this.authService.addClaimsAgent(newCA).subscribe(
        response => {
          console.log(response);
          // Show success message
          //this.snackBar.open('Claims agent added successfully!', 'Close', { duration: 3000 });
          // Navigate to the login page after successful signup
          this.router.navigate(['/login']); // Replace 'login' with the actual route path
        },
        error => {
          console.error(error);
  
          // Show error message
          this.snackBar.open('Failed to add claims agent', 'Close', { duration: 3000 });
        }
      );
    }
  }
}