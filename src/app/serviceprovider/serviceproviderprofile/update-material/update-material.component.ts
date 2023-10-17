import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  material: any;
} 

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})

export class UpdateMaterialComponent {
  updateMaterialForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {

      this.updateMaterialForm = this.formBuilder.group({
        bidMaterialName: [data.material.bidMaterialName, Validators.required],
        bidMaterialDescription: [data.material.bidMaterialDescription, Validators.required],
        bidMaterialCost: [data.material.bidMaterialCost, Validators.required],
        bidQuantity: [data.material.bidQuantity, Validators.required],
        bidTotalCost: data.material.bidTotalCost
      });

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updatedMaterialData = {
      bidMaterialId: this.data.material.bidMaterialId,
      bidMaterialName: this.updateMaterialForm.get('bidMaterialName')?.value,
      bidMaterialDescription: this.updateMaterialForm.get('bidMaterialDescription')?.value,
      bidMaterialCost: this.updateMaterialForm.get('bidMaterialCost')?.value,
      bidQuantity: this.updateMaterialForm.get('bidQuantity')?.value
    };
  
    console.log(updatedMaterialData);
  
    this.authService.updateBidMaterial(updatedMaterialData).subscribe((response) => {
      if (response.success) {
        this.dialogRef.close(response.data);
        this.snackBar.open('Material updated successfully', 'Close', {
          duration: 2000,
        });
      }
    });
  }
}
