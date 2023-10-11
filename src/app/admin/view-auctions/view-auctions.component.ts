import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { manageAuction } from 'src/app/models/admin/manageAuction';
import { manageAuctions } from 'src/app/models/claimagent/manageAuctions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-auctions',
  templateUrl: './view-auctions.component.html',
  styleUrls: ['./view-auctions.component.css']
})
export class ViewAuctionsComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'insuranceCompany','auctionTitle', 'auctionDate', 'startTime', 'endTime', 'auctionStatus'];
  dataSource: MatTableDataSource<manageAuction> = new MatTableDataSource<manageAuction>([]);

  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAuctionDetails();
  }

  applyFilter(event: Event): void {
    // Use optional chaining to safely access event.target.value
    const filterValue = (event.target as HTMLInputElement)?.value?.trim().toLowerCase() || '';
  
    // Update the filter with the computed filterValue
    this.dataSource.filter = filterValue;
  
    // If filterValue is empty, reset the filterPredicate to the default to show all elements
    if (filterValue === '') {
      this.dataSource.filterPredicate = (data: manageAuction, filter: string) => true;
    } else {
      // Otherwise, set a custom filterPredicate based on your needs
      this.dataSource.filterPredicate = (data: manageAuction, filter: string) => {
        // Customize this condition based on your filtering requirements
        const claimsAgent = data.claimsAgent;
  
        return (
          claimsAgent?.firstName?.toLowerCase().includes(filter) ||
          claimsAgent?.lastName?.toLowerCase().includes(filter) ||
          claimsAgent?.insuranceCompany?.toLowerCase().includes(filter)
        );
      };
    }
  }
  
  

  loadAuctionDetails() {
    this.authService.getAllAuction().subscribe(
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
