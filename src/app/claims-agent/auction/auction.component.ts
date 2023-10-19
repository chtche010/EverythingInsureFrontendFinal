import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  @ViewChild('stepper') stepper: any;

  //customerName!: string; // Make sure you have this property in your component class
  allInfo: any;


  addedMaterials: any[] = [];
  isAddingMaterial = false;
  showMaterialsCard = false;

  claimDetailsForm!: FormGroup;
  auctionForm!: FormGroup;
  guidePriceForm!: FormGroup;
  materialCostForm!: FormGroup;
  summaryForm!: FormGroup;
  imageUploadForm!: FormGroup;
  imageFiles: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private jwtHelper : JwtHelperService,
    private datePipe: DatePipe,
    private router: Router,
  ) {}

  isLinear = true;
  claimId!: number; 
  auctionId!: number;
  guidePriceId!: number;

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
    });

    this.imageUploadForm = this.formBuilder.group({
      images: ['']
    });

    this.auctionForm = this.formBuilder.group({
      claimId: ['', Validators.required],
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

  nextStep() {
    if (this.stepper) {
      this.stepper.next(); // Navigate to the next step
    }
  }

  onImageSelect(event: any) {
    if (event.target.files) {
      this.imageFiles = Array.from(event.target.files);
      console.log('Selected files:', this.imageFiles);
    } else {
      console.log('No files selected');
    }
  }

  submitClaimDetails() {
    if (this.claimDetailsForm.valid) {
      this.authService.submitClaimData(this.claimDetailsForm.value).subscribe((response) => {
        console.log("Claim details submitted successfully!");

        const claimId = response.data;
        this.authService.setClaimId(claimId);
        this.auctionForm.patchValue({ claimId: claimId });

        this.claimId = claimId;

        this.submitAuctionDetails(this.claimId);
        // Proceed to the next step
      }, (error) => {
        console.log("Error submitting claim details:", error);
      });
    } else {
      // Handle form validation errors if needed
    }
  }
  
  uploadImages() {
    console.log('imageFiles:', this.imageFiles);
  
    if (this.imageFiles && this.imageFiles.length > 0) {
      const files: File[] = Array.from(this.imageFiles);
  
      this.authService.uploadImages(this.claimId, files).subscribe(
        (response) => {
          console.log('Images uploaded successfully!', response);
          console.log('claimId', this.claimId);
          console.log('Files:', files);
          this.nextStep();
        },  
        (error) => {
          console.error('Error uploading images:', error);
          // Handle error if needed
        }
      );
    } else {
      console.error('No files selected for upload.');
    }
  }
  
  submitAuctionDetails(claimId: number) {
    if (this.auctionForm.valid) {

      // Parse input values as valid Date objects
    const auctionDate = new Date(this.auctionForm.value.auctionDate);
    const startTime = new Date(`1970-01-01T${this.auctionForm.value.startTime}`);
    const endTime = new Date(`1970-01-01T${this.auctionForm.value.endTime}`);
  
    // Convert to ISO strings
    const formattedAuctionDate = auctionDate.toISOString();
    const formattedStartTime = startTime.toISOString();
    const formattedEndTime = endTime.toISOString();

    const auctionDetails = {
      claimId: claimId,
      auctionDate: formattedAuctionDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };

      this.authService.createAuction(auctionDetails).subscribe((response) => {
        console.log("Auction details submitted successfully!");
        
        const auctionId = response.data;
        this.authService.setAuctionId(auctionId);
        this.auctionForm.patchValue({ auctionId: auctionId });

        this.auctionId = auctionId;

        this.submitGuidePrice(this.auctionId);

        // Proceed to the next step
      }, (error) => {
        console.log("Error submitting auction details:", error);
        console.log("auctionDetails:", auctionDetails);
      });
    } else {
      // Handle form validation errors if needed
    }
  }

  submitGuidePrice(auctionId: number) {
    if (this.guidePriceForm.valid) {

      const guidePrice = {
        auctionId: auctionId,
        labourCost: this.guidePriceForm.value.labourCost,
        estimatedDuration: this.guidePriceForm.value.estimatedDuration,
      };

      this.authService.createGuidePrice(guidePrice).subscribe((response) => {
        console.log("Guide price details submitted successfully!");

        const guidePriceId = response.data;
        this.authService.setGuidePriceId(guidePriceId);
        this.auctionForm.patchValue({ guidePriceId: guidePriceId });

        this.guidePriceId = guidePriceId;
        this.addMaterial(this.guidePriceId);
        // Proceed to the next step
      }, (error) => {
        console.log("Error submitting guide price details:", error);
      });
    } else {
      // Handle form validation errors if needed
    }
  }

  addMaterial(guidePriceId: number) {
    
    if (this.materialCostForm.valid) {
      
      console.log("guidePriceId:", guidePriceId);

      const material = {
        guidePriceId: guidePriceId,
        materialName: this.materialCostForm.value.materialName,
        materialDescription: this.materialCostForm.value.materialDescription,
        cost: this.materialCostForm.value.cost,
        quantity: this.materialCostForm.value.quantity
      };

      this.authService.createGuidePriceMaterial(material).subscribe(() => {
        console.log("Material added successfully!");
        //this.getclaimInformation()

       

      this.addedMaterials.push(material);
      this.materialCostForm.reset();
      this.showMaterialsCard = true;
     // this.getclaimInformation()

     
      
    }, (error) => {
      console.log("Error adding material:", error);
    });
  } else {
    // Handle form validation errors if needed
  }
}

handleSubmit() {
  this.snackBar.open('Auction added successfully!', 'Close', { duration: 5000 });
  this.router.navigate(['/manageauctions']);
  this.getclaimInformation()
}

onStepSelectionChange(event: any) {
  if (event.selectedIndex === 5) { // 4 is the 5th step (0-based index)
    // Call your method here
    this.getclaimInformation();
  }
}

getclaimInformation(){

  this.authService.getAllClaimInformaation(this.claimId).subscribe
  ((response) => {
    console.log("All Claim information loaded successfully!", response.data);
    this.allInfo = response.data;

  
  }, (error) => {
    console.log("Error loading claim information", error);

  });


}
}