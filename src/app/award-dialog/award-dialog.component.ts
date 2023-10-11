import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-award-dialog',
  templateUrl: './award-dialog.component.html',
  styleUrls: ['./award-dialog.component.css'],
})
export class AwardDialogComponent implements OnInit {
  topThreeBids!: any[]; // You should define the type based on your data structure
  currentIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AwardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.topThreeBids = this.data.topThreeBids;
  }

  navigate(step: number): void {
    this.currentIndex += step;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
