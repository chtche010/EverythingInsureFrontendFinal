import { Component, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { updateClaim } from 'src/app/models/claimagent/updateClaim';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updateclaim',
  templateUrl: './updateclaim.component.html',
  styleUrls: ['./updateclaim.component.css']
})

export class UpdateclaimComponent {
  claimData: updateClaim; 
  claimId: number; 

constructor(
  private authService: AuthService,
  public dialogRef: MatDialogRef<UpdateclaimComponent>,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) private data: any
) {
  if (data && data.updateClaim && data.claimId) {
    this.claimData = { ...data.updateClaim };
    this.claimId = data.claimId;
  } else {
    // Handle the case where data is missing or incomplete
    this.claimData = new updateClaim(); // Initialize with default values
    this.claimId = 0; // Set a default value for claimId or handle it accordingly
    console.error('Data is missing or incomplete.');
  }
}

updateClaim() {
  const updatedClaimData: updateClaim = {
    ...this.claimData, 
    claimId: this.data.claimId, 
  };

  console.log('Updated Claim Data:', updatedClaimData);
  console.log('claimId:', updatedClaimData.claimId);

  this.authService.updateclaim(updatedClaimData).subscribe(
    (response) => {
      this.dialogRef.close(response);
      this.snackBar.open('Update successful', 'Close', { duration: 3000 });
    },
    (error) => {
      console.error('Error updating claim:', error)
    }
  );
}

closeDialog(): void {
  this.dialogRef.close();
}

}
