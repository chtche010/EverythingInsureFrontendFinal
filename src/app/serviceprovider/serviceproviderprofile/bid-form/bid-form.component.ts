import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/services/auth.service';
import { createBid } from 'src/app/models/serviceprovider/createBid';
import { createBidMaterial } from 'src/app/models/serviceprovider/createBidMaterial';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})

export class BidFormComponent {
  bidForm!: FormGroup;
  auctionId!: number;
  auctionDetails: any;

 @ViewChild('stepper') stepper!: MatStepper;
  bidId: any;

  constructor(
    private snackBar: MatSnackBar, 
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initializeBidForm();

    this.route.queryParams.subscribe((params) => {
      this.auctionId = +params['auctionId'];
      console.log('auctionId', this.auctionId);

      this.loadAuctionDetails(this.auctionId);
    });
  }

  initializeBidForm() {
    this.bidForm = this.formBuilder.group({
      jobDescription: ['', Validators.required],
      bidTotalLabourCost: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      bidEstimatedDuration: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      bidMaterials: this.formBuilder.array([])
    });

  }

  get bidMaterials(): FormArray {
    return this.bidForm.get('bidMaterials') as FormArray;
  }

  removeMaterial(index: number) {
    this.bidMaterials.removeAt(index);
  }

  addMaterial() {
    const materialGroup = this.formBuilder.group({
      bidMaterialName: ['', Validators.required],
      bidMaterialDescription: ['', Validators.required],
      bidMaterialCost: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      bidQuantity: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      totalCost: ['']
    });

    materialGroup.valueChanges.subscribe(() => {
      const bidMaterialCost = Number(materialGroup.get('bidMaterialCost')?.value);
      const bidQuantity = Number(materialGroup.get('bidQuantity')?.value);
      const totalCost = bidMaterialCost * bidQuantity;
      materialGroup.get('totalCost')?.setValue(totalCost.toString());
    });

    this.bidMaterials.push(materialGroup);

  }

  getMaterialsControls() {
    return (this.bidForm.get('bidMaterials') as FormArray).controls;
  }

  isMaterialRowValid(index: number): boolean {
    const materialGroup = this.bidMaterials.at(index) as FormGroup;
    return materialGroup.valid;
  }

  isSubmitNextDisabled(): boolean {
    const hasValidBidMaterials = this.bidMaterials.valid && this.bidMaterials.length > 0;
    return !hasValidBidMaterials;
  }

  submitNext() {
    // Check if the bidMaterials array has at least one valid material
    const hasValidBidMaterials = this.bidMaterials.valid && this.bidMaterials.length > 0;
    if (this.bidForm.valid && hasValidBidMaterials) {
      // Perform any necessary actions when the "Submit & Next" button is clicked
      // For example, you can display a success message and navigate to the next step
      console.log("Submit & Next clicked!");
      const currentStepIndex = this.stepper.selectedIndex;
      // Update the active step by incrementing the current index value
      this.stepper.selectedIndex = currentStepIndex + 1;
      this.createMaterial(this.bidId);
    } else {
      // Display an error message and prevent the user from proceeding to the next step
      this.snackBar.open('Please add at least one bid material.', 'Close', {
        duration: 5000,
      });
    }
  }

  calculateTotalMaterialCost(): number {
    let totalCost = 0;
    this.bidMaterials.controls.forEach((materialGroup: AbstractControl) => {
      const bidMaterialCost = Number(materialGroup.get('bidMaterialCost')?.value) || 0;
      const bidQuantity = Number(materialGroup.get('bidQuantity')?.value) || 0;
      totalCost += bidMaterialCost * bidQuantity;
    });

    return totalCost;

  }

  calculateFinalBidPrice(): number {
    const bidTotalLabourCost = Number(this.bidForm.get('bidTotalLabourCost')?.value) || 0;
    const totalMaterialCost = this.calculateTotalMaterialCost();
    return bidTotalLabourCost + totalMaterialCost;
  }

  get formControls() {
    return this.bidForm.controls;
  }

  submitBid() {
    if (this.bidForm.valid) {
      // Log the values before making the API call
      const bidData = {
        jobDescription: this.bidForm.value.jobDescription,
        bidTotalLabourCost: this.bidForm.value.bidTotalLabourCost,
        bidEstimatedDuration: this.bidForm.value.bidEstimatedDuration,
        auctionId: this.auctionId };
  
      console.log('jobDescription:', bidData.jobDescription);
      console.log('bidTotalLabourCost:', bidData.bidTotalLabourCost);
      console.log('bidEstimatedDuration:', bidData.bidEstimatedDuration);
      console.log('auctionId:', bidData.auctionId);
  
      // Add your code to submit the bid to the backend
      this.authService.submitBid(bidData).subscribe(
        (response) => {
          // Handle the response from the API
          this.snackBar.open('Success! Your bid has been placed!', 'Close', {
            duration: 5000,
          });

          const bidId = response.data;
          this.authService.setBidId(bidId);
          this.bidForm.patchValue({ bidId: bidId });

          this.bidId = bidId;
          this.createMaterial(this.bidId);
        },
        (error) => {
          // Handle API errors here
          console.error('API Error:', error);
          this.snackBar.open('Error occurred while submitting the bid.', 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      // Handle the case when the form is not valid
      // Display an error message and prevent the user from proceeding to the next step
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
      });
    }
  }

  createMaterial(bidId: number){
    if (this.bidForm.valid) {
      console.log("bidID:", bidId);
  
      this.bidMaterials.controls.forEach((materialGroup: AbstractControl, index: number) => {
        const materialData = {
          bidId: this.bidId,
          bidMaterialName: materialGroup.get('bidMaterialName')?.value,
          bidMaterialDescription: materialGroup.get('bidMaterialDescription')?.value,
          bidMaterialCost: materialGroup.get('bidMaterialCost')?.value,
          bidQuantity: materialGroup.get('bidQuantity')?.value,
        };
  
        this.authService.submitBidMaterial(materialData).subscribe(() => {
          console.log("Material added successfully at index ", index);
        }, (error) => {
          console.log("Error adding material at index ", index, ": ", error);
        });
      });
    } else {
      // Handle validation errors if needed 
    }
  }

  handleSubmit() {
    this.snackBar.open('Auction added successfully!', 'Close', { duration: 5000 });
    this.router.navigate(['/caprofile']);
  }

  loadAuctionDetails(auctionId: number): void {
    this.authService.getSingleAuction(auctionId).subscribe(
      (response: any) => {
        console.log('Hello',response.data)
        this.auctionDetails = response.data;
      }, 
      (error) => {
        console.error('Error fetching auction details:', error);
      }
    );
  }
}