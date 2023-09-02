import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})

export class BidFormComponent {
  bidForm!: FormGroup;
 @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private snackBar: MatSnackBar, 
    private formBuilder: FormBuilder,
    private router: Router,
    private authSerivce: AuthService,
    ) { }

  ngOnInit(): void {
    this.initializeBidForm();
  }

  initializeBidForm() {
    this.bidForm = this.formBuilder.group({
      labourCost: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      estimatedDuration: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
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
      materialName: ['', Validators.required],
      materialDescription: ['', Validators.required],
      materialCost: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      totalCost: ['']
    });

    materialGroup.valueChanges.subscribe(() => {
      const materialCost = Number(materialGroup.get('materialCost')?.value);
      const quantity = Number(materialGroup.get('quantity')?.value);
      const totalCost = materialCost * quantity;
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
      const materialCost = Number(materialGroup.get('materialCost')?.value) || 0;
      const quantity = Number(materialGroup.get('quantity')?.value) || 0;
      totalCost += materialCost * quantity;
    });

    return totalCost;

  }

  calculateFinalBidPrice(): number {
    const labourCost = Number(this.bidForm.get('labourCost')?.value) || 0;
    const totalMaterialCost = this.calculateTotalMaterialCost();
    return labourCost + totalMaterialCost;
  }

  submitBid() {
    if (this.bidForm.valid) {
      // Add your code to submit the bid to the backend
      this.snackBar.open('Success! Your bid has been placed!', 'Close', {
        duration: 5000,
      });
      //navigate to auction dashboard
      this.router.navigate(['/auction-dashboard']);
    } else {
      //handle the case when the form is not valid
      // Display an error message and prevent the user from proceeding to the next step
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
      });
    }
  }

}