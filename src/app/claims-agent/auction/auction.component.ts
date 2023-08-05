import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  @ViewChild('stepper') stepper: any;
  claimDetailsForm!: FormGroup;
  auctionForm!: FormGroup;
  guidePriceForm!: FormGroup;
  materialCostForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  isLinear = true;

  ngOnInit(): void {
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
    });
  }

  submitClaimDetails() {
    if (this.claimDetailsForm.valid) {
      const formData = this.claimDetailsForm.value;
      this.authService.submitClaimData(formData).subscribe(
        response => {
          this.stepper.next();
        },
        error => {
          this.snackBar.open('An error has occurred while submitting.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please complete the form correctly before proceeding.', 'Close', {
        duration: 3000,
      });
    }
  }

  submitAuctionDetails(): void {
    if (this.auctionForm.valid) {
      const auctionDetailsData = this.auctionForm.value;
      this.authService.createAuction(auctionDetailsData).subscribe(
        (response) => {
          this.stepper.next();
        },
        (error) => {
          this.snackBar.open('An error has occurred while submitting.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please complete the form correctly before proceeding.', 'Close', {
        duration: 3000,
      });
    }
  }

  submitGuidePrice(): void {
    if (this.guidePriceForm.valid) {
      const guidePriceData = this.guidePriceForm.value;
      this.authService.createGuidePrice(guidePriceData).subscribe(
        (response) => {
          this.stepper.next();
        },
        (error) => {
          this.snackBar.open('An error has occurred while submitting.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please complete the form correctly before proceeding.', 'Close', {
        duration: 3000,
      });
    }
  }

  submitMaterialCost(): void {
    // Submit material cost form data to API endpoint
    const materialCostData = this.materialCostForm.value;
    this.authService.createGuidePriceMaterial(materialCostData).subscribe(
      (response) => {
        this.stepper.next();
      },
      (error) => {
        this.snackBar.open('An error has occurred while submitting.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}