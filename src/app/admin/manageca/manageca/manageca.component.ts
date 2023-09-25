import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { claimsAgentList } from 'src/app/models/admin/claimsAgentList.model';
import { AuthService } from 'src/app/services/auth.service';

export interface PeriodicElement {
  firstName: number;
  lastName: string;
  insuranceCompany: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-manageca',
  templateUrl: './manageca.component.html',
  styleUrls: ['./manageca.component.css']
})
export class ManagecaComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'insuranceCompany', 'email'];
  dataSource!: MatTableDataSource<claimsAgentList>;
  pendingDataSource!: MatTableDataSource<claimsAgentList>;
  approvedDataSource!: MatTableDataSource<claimsAgentList>;
  rejectedDataSource!: MatTableDataSource<claimsAgentList>;





  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.pendingDataSource = new MatTableDataSource<claimsAgentList>();
this.approvedDataSource = new MatTableDataSource<claimsAgentList>();
this.rejectedDataSource = new MatTableDataSource<claimsAgentList>();
    this.dataSource = new MatTableDataSource<claimsAgentList>();
    this.loadAuctionDetails();
  }
  
  loadAuctionDetails() {
    this.authService.getClaimsAgent().subscribe(
      (response: any) => {
        console.log(response.data);
        const pendingUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Pending');
        console.log(pendingUsers);
      const approvedUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Approved');
      console.log(approvedUsers);

      const rejectedUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Rejected');
      console.log(rejectedUsers);

        this.dataSource.data = response.data;
        this.pendingDataSource.data = pendingUsers;
      this.approvedDataSource.data = approvedUsers;
      this.rejectedDataSource.data = rejectedUsers;
      },
      (error) => {
        console.error('Error fetching auction details', error);
      }
    );
  }

}
