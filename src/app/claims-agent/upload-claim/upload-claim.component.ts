import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { addclaim } from 'src/app/models/addclaim';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-claim',
  templateUrl: './upload-claim.component.html',
  styleUrls: ['./upload-claim.component.css']
})

export class UploadClaimComponent implements OnInit {
  claimupload!: FormGroup;
  addClaimRequest: addclaim = {
    claimId: '',
    customerName: '',
    customerEmail: '', 
    vehicleMake: '',
    vehicleModel: '',
    modelYear: '',
    MMCode: '',
    damageDescription: '',
    customerSurbub: '',
    customerCity: '',
    customerProvince: '',
    claimsAgent: '',
    claimsAgentId: '',
  };

  submitSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sharedServices: SharedService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.claimupload = this.formBuilder.group({
    customerName: ['', [Validators.required]],
    customerEmail: ['', [Validators.required]],
    vehicleMake: ['', [Validators.required]],
    vehicleModel: ['', [Validators.required]],
    modelYear: ['', [Validators.required]],
    MMCode: ['', [Validators.required]],
    damageDescription: ['', [Validators.required]],
    customerSurbub: ['', [Validators.required]],
    customerCity: ['', [Validators.required]],
    customerProvince: ['', [Validators.required]],
    claimsAgent: ['', [Validators.required]],
    });
  }

  handleSubmit(): void {
    // if (this.claimupload.valid) {
    //   this.addClaimRequest.claimId = '';
    //   this.addClaimRequest.customerName = this.claimupload.value.customerName;
    //   this.addClaimRequest.customerEmail = this.claimupload.value.customerEmail;
    //   this.addClaimRequest.vehicleMake = this.claimupload.value.vehicleMake;
    //   this.addClaimRequest.vehicleModel = this.claimupload.value.vehicleModel;
    //   this.addClaimRequest.modelYear = this.claimupload.value.modelYear;
    //   this.addClaimRequest.MMCode = this.claimupload.value.MMCode;
    //   this.addClaimRequest.damageDescription = this.claimupload.value.damageDescription;
    //   this.addClaimRequest.customerSurbub = this.claimupload.value.customerSurbub;
    //   this.addClaimRequest.customerCity = this.claimupload.value.customerCity;
    //   this.addClaimRequest.customerProvince = this.claimupload.value.customerProvince;
    //   this.addClaimRequest.claimsAgent = this.claimupload.value.claimsAgent;
    //   this.addClaimRequest.claimsAgentId = '';

    //   this.sharedServices.addClaim(this.addClaimRequest).subscribe(
    //     (response: any) => {
    //       console.log(response);
    //       this.claimupload.reset();
    //       this.submitSuccess = true;
    //     },
    //     (error: any) => {
    //       console.log(error);
    //     }
    //   );
    // } else {
    //   console.log('Form in invaild, please fill in all the required fields');
    // }
  }
}
