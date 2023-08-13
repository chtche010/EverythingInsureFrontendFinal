import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PeriodicElement } from 'src/app/models/claimagent/manageClaims';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manageclaims',
  templateUrl: './manageclaims.component.html',
  styleUrls: ['./manageclaims.component.css'],
})

export class ManageclaimsComponent {
  displayedColumns: string[] = ['customerName', 'customerEmail', 'vehicleMake', 'vehicleModel', 'modelYear', 'MMCode', 'damageDescription', 'customerSurbub', 'customerCity', 'customerProvince'];
  dataSource!: MatTableDataSource<PeriodicElement>;

  constructor(private authService: AuthService) {}

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
}
