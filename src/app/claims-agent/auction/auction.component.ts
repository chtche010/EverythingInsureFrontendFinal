import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  claimDetailsForm: FormGroup;
  auctionForm: FormGroup = new FormGroup({});
  guidePriceForm: FormGroup;
  materialCostForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.claimDetailsForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.required],
      vehicleMake: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      modelYear: ['', Validators.required],
      MMCode: ['', Validators.required],
      damageDescription: ['', Validators.required],
      customerSurbub: ['', Validators.required],
      customerCity: ['', Validators.required],
      customerProvince: ['', Validators.required],
      claimsAgent: ['', Validators.required]
    });
   
    this.auctionForm = this.formBuilder.group({
      auctionDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });

    this.guidePriceForm = this.formBuilder.group({
      labourCost: ['', Validators.required],
      estimatedDuration: ['', Validators.required],
    });

    this.materialCostForm = this.formBuilder.group({
      materialName: ['', Validators.required],
      materialDescription: ['', Validators.required],
      cost: ['', Validators.required],
      quantity: ['', Validators.required],
    })

  }

  ngOnInit(): void {}
}
