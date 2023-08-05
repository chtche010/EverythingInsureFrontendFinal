import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedService } from '../shared.service';
import { addclaimsagent } from '../models/claimagent/addclaimsagent';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
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

    this.authService.addClaimsAgent(newCA).subscribe(
      response => {
        console.log(response); 
      },
      error => {
        console.error(error);
      }
    );
  }
}

}
