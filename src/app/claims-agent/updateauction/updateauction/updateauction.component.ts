import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { updateAuction } from 'src/app/models/claimagent/updateAuction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form modules
import { DateTime } from 'luxon';
import { DatePipe } from '@angular/common';
import { auctionDataWithId } from 'src/app/models/claimagent/getAuction';

@Component({
  selector: 'app-updateauction',
  templateUrl: './updateauction.component.html',
  styleUrls: ['./updateauction.component.css']
})
export class UpdateauctionComponent implements OnInit {
  auctionForm!: FormGroup; // Define FormGroup for your form
  auctionData: updateAuction;
  auctionId: number;
  auctionStartTimePicker!: string;
  auctionEndTimePicker!: string;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpdateauctionComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder, // Inject FormBuilder
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data && data.updateAuction && data.auctionId) {
      this.auctionData = { ...data.updateAuction };
      console.log(this.auctionData);

      this.auctionId = data.auctionId;
      console.log(this.auctionData.auctionDate);
      this.auctionStartTimePicker = this.extractTime(this.auctionData.startTime);
      console.log(this.auctionData.startTime);
      this.auctionEndTimePicker = this.extractTime(this.auctionData.endTime);
      console.log(this.auctionData.endTime);
    } else {
      this.auctionData = new updateAuction();
      this.auctionId = 0;
      console.error('Data is missing or incomplete');
    }
  }

  ngOnInit() {
    this.auctionForm = this.fb.group({
      auctionDate: [this.auctionData.auctionDate, Validators.required], // Initialize with data and validators
      startTime: [this.auctionData.startTime, Validators.required], // Initialize with data and validators
      endTime: [this.auctionData.endTime, Validators.required], // Initialize with data and validators
    });

    console.log('auctionStartTimePicker:', this.auctionStartTimePicker);
    console.log('auctionEndTimePicker:', this.auctionEndTimePicker);
  }

  extractTime(dateTimeString: string): string {
    const dateTime = DateTime.fromISO(dateTimeString);
    if (dateTime.isValid) {
      return dateTime.toFormat('HH:mm');
    } else {
      return ''; // Handle invalid format or null value
    }
  }

  convertTime(timeString: string): string {
    return DateTime.fromFormat(timeString, 'HH:mm:ss').toFormat('HH:mm');
  }

  convertToDisplayDate(dateString: string): string {
    return DateTime.fromFormat(dateString, 'yyyy-MM-dd').toFormat('yyyy-MM-dd');
  }

  convertToDisplayTime(timeString: string): string {
    return DateTime.fromFormat(timeString, 'HH:mm:ss').toFormat('HH:mm');
  }
  //   if (this.auctionForm.valid) {
  //     const auctionDateControl = this.auctionForm.get('auctionDate');
  //     const startTimeControl = this.auctionForm.get('startTime');
  //     const endTimeControl = this.auctionForm.get('endTime');
  //     const auctionIdControl = this.auctionForm.get('auctionId'); // Get auctionId control
  
  //     if (auctionDateControl && startTimeControl && endTimeControl && auctionIdControl) {
  //       const auctionDateValue = auctionDateControl.value;
  //       const startTimeValue = startTimeControl.value;
  //       const endTimeValue = endTimeControl.value;
  //       const auctionIdValue = auctionIdControl.value; // Get auctionId value
        
  //       // Create a new object with only the fields needed for updating
  //       const updatedAuctionData = {
  //         auctionId: auctionIdValue, // Include auctionId in the updated data
  //         auctionDate: auctionDateValue,
  //         startTime: startTimeValue,
  //         endTime: endTimeValue,
  //       } as updateAuction; // Cast it to the type 'updateAuction'
  
  //       // Send the updated data to your service or API
  //       this.authService.updateauction(updatedAuctionData).subscribe(
  //         (response) => {
  //           // Handle successful response, e.g., close the dialog
  //           this.dialogRef.close(response);
  //           this.snackBar.open('Update successful', 'Close', { duration: 3000 });
  //         },
  //         (error) => {
  //           console.error('Error updating auction details', error);
  //           // Handle error
  //         }
  //       );
  //     } else {
  //       console.error('Form controls are null. Handle this case accordingly.');
  //     }
  //   } else {
  //     console.error('Form is not valid');
  //   }
  // }
  
    // Helper function to convert time to ISO format
    
    convertTimeToISO(timeString: string): string {
      const formattedTime = DateTime.fromFormat(timeString, 'HH:mm:ss.SSS').toISOTime();
      return formattedTime || '';
    }
  
    convertToISODate(displayDate: string | null): string {
      if (displayDate === null) {
        return ''; // Handle null value accordingly
      }
    
      const dateTime = DateTime.fromFormat(displayDate, 'yyyy-MM-dd');
      if (!dateTime.isValid) {
        return ''; // Handle invalid date format
      }
    
      return dateTime.toISODate() || '';
    }

    updateAuction() {
      if (this.auctionForm.valid) {
        const auctionId = this.auctionData.auctionId;
        const auctionDate = new Date(this.auctionForm.value.auctionDate);
        const startTime = new Date(`1970-01-01T${this.auctionForm.value.startTime}`);
        const endTime = new Date(`1970-01-01T${this.auctionForm.value.endTime}`);

        console.log('auctionDate:', auctionDate);
        console.log('startTime:', startTime);
        console.log('endTime:', endTime);

        const formattedAuctionDate = auctionDate.toISOString(); 
        const formattedStartTime = startTime.toISOString();
        const formattedEndTime = endTime.toISOString();

        const updateData = {
          auctionId: auctionId,
          auctionDate: formattedAuctionDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        }
    
        this.authService.updateauction(updateData).subscribe(
          (data) => {
            console.log('Updated data:', data);
            this.snackBar.open('Update successful', 'Close', { duration: 3000 });
          },
          (error) => {
            console.error('Error updating auction details');
          }
        );
      }
    }

  convertToDatabaseDate(displayDate: string | null): string {
    if (displayDate === null) {
      return ''; // Handle null value accordingly, e.g., return an empty string
    }
  
    const dateTime = DateTime.fromFormat(displayDate, 'yyyy-MM-dd');
    return dateTime.isValid ? dateTime.toISODate()! : '';
  }

  convertToDatabaseTime(displayTime: string | null): string {
    if (displayTime === null) {
      return ''; // Handle null value accordingly
    }
  
    const dateTime = DateTime.fromISO(displayTime);
    if (dateTime.isValid) {
      return dateTime.toFormat('HH:mm');
    }
  
    return ''; // Handle invalid format or null value
  }

  closeDialog(): void {
    this.dialogRef.close(); // This will close the dialog
  }
}
