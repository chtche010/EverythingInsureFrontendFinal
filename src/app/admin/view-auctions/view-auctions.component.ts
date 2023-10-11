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
    const filterValue = (event.target as HTMLInputElement)?.value?.trim().toLowerCase() || '';
  
    this.dataSource.filter = filterValue;
  
    if (filterValue === '') {
      this.dataSource.filterPredicate = (data: manageAuction, filter: string) => true;
    } else {
      this.dataSource.filterPredicate = (data: manageAuction, filter: string) => {
        const claimsAgent = data.claimsAgent;
  
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long', // Display the full month name
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        
  
        const auctionDateStr = new Date(data.auctionDate).toLocaleString('en-US', options);
        const startTimeStr = new Date(data.startTime).toLocaleString('en-US', options);
        const endTimeStr = new Date(data.endTime).toLocaleString('en-US', options);
  
        return (
          (claimsAgent?.firstName?.toLowerCase().includes(filter) ||
            claimsAgent?.lastName?.toLowerCase().includes(filter) ||
            claimsAgent?.insuranceCompany?.toLowerCase().includes(filter)) ||
          data.auctionTitle?.toLowerCase().includes(filter) ||
          auctionDateStr.toLowerCase().includes(filter) ||
          startTimeStr.toLowerCase().includes(filter) ||
          console.log(startTimeStr) ||
          endTimeStr.toLowerCase().includes(filter) ||
          data.auctionStatus?.toLowerCase().includes(filter)
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
