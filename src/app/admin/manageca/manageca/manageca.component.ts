import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { claimsAgentList } from 'src/app/models/admin/claimsAgentList.model';
import { AuthService } from 'src/app/services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ElementSchemaRegistry } from '@angular/compiler';

export interface PeriodicElement {
  firstName: number;
  lastName: string;
  insuranceCompany: string;
  email: string;
  accountStatus: string;

}

//yourmodel(claimsAgentList)=with data
//yourModel = structure

const allowMultiSelect = true;
var ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-manageca',
  templateUrl: './manageca.component.html',
  styleUrls: ['./manageca.component.css']
})
export class ManagecaComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'insuranceCompany', 'email'];
  displayedColumns2: string[] = ['select', 'firstName', 'lastName', 'insuranceCompany', 'email'];

  selectedItems: any[] = [];


  dataSource!: MatTableDataSource<claimsAgentList>;
  databaseSource!: MatTableDataSource<PeriodicElement>;
    pendingDataSource!: MatTableDataSource<claimsAgentList>;
  approvedDataSource!: MatTableDataSource<claimsAgentList>;
  rejectedDataSource!: MatTableDataSource<claimsAgentList>;

  selection = new SelectionModel<claimsAgentList>(true, [], false);

  getSelectedItems() {
    console.log(this.selection.selected)
    return this.selection.selected;
  }

  displaySelectedItems() {
    this.selectedItems = this.getSelectedItems();
    console.log(this.selectedItems)
    return this.selectedItems;


  }
  

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.pendingDataSource = new MatTableDataSource<claimsAgentList>();
    this.approvedDataSource = new MatTableDataSource<claimsAgentList>();
    this.rejectedDataSource = new MatTableDataSource<claimsAgentList>();
    this.dataSource = new MatTableDataSource<claimsAgentList>();
    this.loadCADetails();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.pendingDataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
   this.isAllSelected()
      this.selection.clear();
      this.pendingDataSource.data.forEach((row) => this.selection.select(row));
    }
  



  loadCADetails() {
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

