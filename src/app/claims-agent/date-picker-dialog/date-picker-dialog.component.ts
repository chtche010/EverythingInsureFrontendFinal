import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-picker-dialog',
  templateUrl: './date-picker-dialog.component.html',
})

export class DatePickerDialogComponent {
  selectedDate!: Date;
  date!: string;
  constructor(public dialogRef: MatDialogRef<DatePickerDialogComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.date = this.selectedDate.toISOString();
    this.dialogRef.close(this.date);
  }
}
