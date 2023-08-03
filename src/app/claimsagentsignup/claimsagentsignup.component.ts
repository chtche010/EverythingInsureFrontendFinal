import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedService } from '../shared.service';
import { addclaimsagent } from '../models/addclaimsagent';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private sharedServices: SharedService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.caregister = this.formBuilder.group({
      insuranceCompany: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  handleSubmit(): void {
    // if (this.caregister.valid) {

    //   this.addClaimsAgentRequest.claimsAgentId = '';
    //   this.addClaimsAgentRequest.insuranceCompany = this.caregister.value.insuranceCompany;
    //   this.addClaimsAgentRequest.firstName = this.caregister.value.firstName;
    //   this.addClaimsAgentRequest.lastName = this.caregister.value.lastName;

    //     this.sharedServices.addClaimsAgent(this.addClaimsAgentRequest).subscribe(
    //       (response: any) => {
    //         console.log(response);
    //         this.caregister.reset();
    //         this.signupSuccess = true;
    //       },
    //       (error: any) => {
    //         console.log(error);
    //       }
    //     );
    // } else {
    //   console.log('Form is invalid. Please fill in all the required fields');
    // }
  }
}
