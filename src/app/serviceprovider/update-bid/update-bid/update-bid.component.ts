import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Angular forms module
import { updateBid } from 'src/app/models/serviceprovider/updateBid';
import { getBids } from 'src/app/models/serviceprovider/getBids';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-bid',
  templateUrl: './update-bid.component.html',
  styleUrls: ['./update-bid.component.css']
})
export class UpdateBidComponent {
  bidData: updateBid = new updateBid();
  bidId: number;
  updateForm: FormGroup; // Define a FormGroup for form controls

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpdateBidComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    console.log('bidId:', data.bidId);
    
    this.updateForm = this.fb.group({ // Initialize the form group with form controls
      jobDescription: [data.jobDescription, Validators.required], // Bind the form control to data.jobDescription
      bidTotalLabourCost: [data.bidTotalLabourCost, Validators.required],
      bidEstimatedDuration: [data.bidEstimatedDuration, Validators.required],
    });

    if (data && data.bidId) {
      this.bidId = data.bidId;
    } else {
      this.bidId = 0;
      console.error('Data is missing or incomplete');
    }
  }

  updateBid() {
    if (this.updateForm.valid) { // Check if the form is valid
      const updatedBidData: updateBid = {
        ...this.bidData,
        bidId: this.bidId,
      };

      console.log('Updated bid data:', updatedBidData);
      console.log('bidId:', updatedBidData.bidId);

      this.authService.updatebid(updatedBidData).subscribe(
        (response) => {
          this.dialogRef.close(response);
          this.snackBar.open('Update successful', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error updating bid:', error)
        }
      );
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
