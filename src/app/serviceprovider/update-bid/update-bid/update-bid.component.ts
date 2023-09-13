import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-bid',
  templateUrl: './update-bid.component.html',
  styleUrls: ['./update-bid.component.css'],
})
export class UpdateBidComponent {
  bidData: any;
  updateBidForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateBidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.bidData = { ...data };

    this.updateBidForm = this.formBuilder.group({
      jobDescription: [this.bidData.jobDescription, Validators.required],
      bidTotalLabourCost: [this.bidData.bidTotalLabourCost, Validators.required],
      bidEstimatedDuration: [this.bidData.bidEstimatedDuration, Validators.required],
    });
  }

  updateBid(): void {
    // Include the bidId in the request body
    const updatedBidData = {
      bidId: this.bidData.bidId,
      jobDescription: this.updateBidForm.get('jobDescription')?.value,
      bidTotalLabourCost: this.updateBidForm.get('bidTotalLabourCost')?.value,
      bidEstimatedDuration: this.updateBidForm.get('bidEstimatedDuration')?.value,
    };

    this.authService.updatebid(updatedBidData).subscribe((response) => {
      if (response.success) {
        this.dialogRef.close(response.data); // Pass data back to the parent component if needed
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
