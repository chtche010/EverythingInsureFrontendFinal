import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent {
  bidId!: number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['bidMaterialName', 'bidMaterialDescription', 'bidMaterialCost', 'bidQuantity', 'bidTotalCost'];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialogRef: MatDialogRef<MaterialListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     const bidId = +params['bidId']; // Ensure it's a number
  //     console.log('Received BidId:', bidId);
  //     // Fetch materials data based on bidId
  //     this.authService.getAllMaterials(bidId).subscribe((response) => {
  //       console.log('API Response for Materials:', response);
  //       this.dataSource = new MatTableDataSource(response.data[0].bidMaterials);
  //     });
  //   });
  // }

  ngOnInit(): void {
    const bidIdString = this.route.snapshot.paramMap.get('bidId');
    const bidId = +bidIdString!;

    console.log('Received BidId:', bidId);
      // Fetch materials data based on bidId
      this.authService.getAllMaterials(bidId).subscribe((response) => {
        console.log('API Response for Materials:', response);
        this.dataSource = new MatTableDataSource(response.data[0].bidMaterials);
      });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  openDialog() {

  }

  deleteClaim() {

  }
}
