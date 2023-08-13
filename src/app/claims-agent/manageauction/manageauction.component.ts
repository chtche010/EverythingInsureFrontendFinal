import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { manageAuctions } from 'src/app/models/claimagent/manageAuctions';

@Component({
  selector: 'app-manageauction',
  templateUrl: './manageauction.component.html',
  styleUrls: ['./manageauction.component.css'],
})

export class ManageauctionComponent {
  displayedColumns: string[] = ['auctionTitle', 'auctionDate', 'startTime', 'endTime', 'auctionStatus', 'guidePrice'];
  dataSource!: MatTableDataSource<manageAuctions>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<manageAuctions>();
    this.loadAuctionDetails();
  }

  loadAuctionDetails() {
    this.authService.cagetauctions().subscribe(
      (response: any) => {
        console.log(response.data);
        this.dataSource.data = response.data;
      },
      (error) => {
        console.error('Error fetching auction details', error);
      }
    );
  }
}
