import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBidComponent } from 'src/app/serviceprovider/update-bid/update-bid/update-bid.component';
import { UpdateMaterialComponent } from '../../update-material/update-material.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent {
  bidId!: number;
  materials: any[] = [];
  displayedColumns: string[] = ['bidMaterialName', 'bidMaterialDescription', 'bidMaterialCost', 'bidQuantity', 'bidTotalCost', 'actions'];

  constructor(  
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const bidId = +params['bidId'];
      this.authService.getAllMaterials(bidId).subscribe((response: any) => {
        this.materials = response.data;
      });
    });
  }

  fetchData() {
    this.route.queryParams.subscribe((params) => {
      const bidId = +params['bidId'];
      this.authService.getAllMaterials(bidId).subscribe((response: any) => {
        this.materials = response.data;
      });
    });
  }

  editMaterial(bidMaterialId: number): void {
    console.log('Editing material with ID:', bidMaterialId);
    this.authService.getSingleBidMaterial(bidMaterialId).subscribe((response: any) => {
      const material = response.data;
      const dialogRef = this.dialog.open(UpdateMaterialComponent, {
        width: '400px',
        data: { material: material }
      });

      dialogRef.afterClosed().subscribe(updatedMaterialData => {
        if (updatedMaterialData) {
          this.fetchData();
          console.log('Material updated successfully', updatedMaterialData);
        }
      });
    });
  }
}

