import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  alert: boolean = false;
  auctionData: any = {};
  formSubmitted = false;
  auctionDate!: Date ;
  startTime!: string;
  endTime!: string;

  constructor() {
    this.auctionDate = new Date(); // Initialize with the current date
    this.startTime = '10:00 AM'; // Initialize with a default start time
    this.updateEndTime(); // Calculate and set the initial end time
  }
  // This method calculates and updates the end time based on the selected date and start time
  updateEndTime() {
    const startDate = new Date(this.auctionDate); // Create a new date object to avoid modifying the original selectedDate
    const startTimeParts = this.startTime.split(':'); // Split the start time string to extract hours and minutes
    const startHour = parseInt(startTimeParts[0], 10); // Parse the hours as an integer
    const startMinute = parseInt(startTimeParts[1], 10); // Parse the minutes as an integer

    startDate.setHours(startHour, startMinute); // Set the start time to the selected date

    // Calculate the end time by adding 24 hours (in milliseconds) to the start time
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    // Format the end time as 'HH:mm AM/PM'
    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();
    const endAMPM = endHour >= 12 ? 'PM' : 'AM';
    const formattedEndHour = (endHour % 12 || 12).toString().padStart(2, '0'); // Convert to 12-hour format
    const formattedEndMinute = endMinute.toString().padStart(2, '0');

    this.endTime = `${formattedEndHour}:${formattedEndMinute} ${endAMPM}`;
  }
  submit(auctionForm: any): void {

    if (auctionForm.valid) {
      console.log("New Auction Event Submitted!", this.auctionData);
      //Add the logic to submit the form data to the backend here!!

      //Show success notifications
      this.formSubmitted = true;

      this.alert = true;
      //clear form data
      this.resetFormData();
      
    } else {
      //Display error messages for the required fields
      for (const field in auctionForm.controls) {
        if (auctionForm.controls[field].invalid) {
          auctionForm.controls[field].markAsTouched();
        }
      }

    }
  }
  closeAlert() {
    this.alert = false;
  }
  private resetFormData(): void {
    this.formSubmitted = false;
    this.auctionData = {};
  }
  minAuctionDate(): string {
    const currentDate = new Date();
    // Format the date to YYYY-MM-DD format required for the 'min' attribute
    const formattedDate = currentDate.toISOString().slice(0, 10);
    return formattedDate;
  }
}
