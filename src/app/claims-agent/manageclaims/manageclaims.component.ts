import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PeriodicElement } from 'src/app/models/claimagent/manageClaims';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateclaimComponent } from '../updateclaim/updateclaim/updateclaim.component';
import { DeleteDialogComponent } from '../delete-claim-dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-manageclaims',
  templateUrl: './manageclaims.component.html',
  styleUrls: ['./manageclaims.component.css'],
})

export class ManageclaimsComponent {
  displayedColumns: string[] = ['customerName', 'customerEmail', 'vehicleMake', 'vehicleModel', 'modelYear', 'MMCode', 'damageDescription', 'customerSurbub', 'customerCity', 'customerProvince', 'actions'];
  dataSource!: MatTableDataSource<PeriodicElement>;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  openDialog(updateClaim: any): void {
    console.log('claimId:', updateClaim.claimId);

    const dialogRef = this.dialog.open(UpdateclaimComponent, {
      width: '80%',
      enterAnimationDuration: '500ms',
      data: { updateClaim, claimId: updateClaim.claimId },
    });
  
    dialogRef.afterClosed().subscribe(
      result => console.log('The dialog was closed', result)
    );

    // Reload claim details after editing (you may need to implement this)
    this.loadClaimDetails();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PeriodicElement>();
    this.loadClaimDetails();
  }

  loadClaimDetails() {
    this.authService.cagetclaims().subscribe(
      (response: any) => { //The type here could be a specific interface if you have it defined
        console.log(response.data); //This should log an array
        this.dataSource.data = response.data; // Set the data to the MatTableDataSource instance
      },
      (error) => {
        console.error('Error fetching claim details:', error);
      }
    );
  }

  openDeleteDialog(claimId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.deleteClaim(claimId).subscribe(
          () => {
            console.log('Claim deleted successfully');
            this.loadClaimDetails();
          },
          (error) => {
          console.log('Error deleting claim:', error);
        }
        );
      }
    });
  }

  applyFilter(event: Event): void {
    // Use optional chaining to safely access event.target.value
    const filterValue = (event.target as HTMLInputElement)?.value?.trim().toLowerCase();
    this.dataSource.filter = filterValue || '';
  }
}