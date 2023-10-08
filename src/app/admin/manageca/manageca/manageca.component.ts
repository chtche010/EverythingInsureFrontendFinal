import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { claimsAgentList } from 'src/app/models/admin/claimsAgentList.model';
import { AuthService } from 'src/app/services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ElementSchemaRegistry } from '@angular/compiler';
import { ChangeDetectorRef } from '@angular/core';
import { rejectionObject } from 'src/app/models/rejectionObject';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


export interface PeriodicElement {
  firstName: number;
  lastName: string;
  insuranceCompany: string;
  email: string;
  accountStatus: string;

}


const allowMultiSelect = true;
var ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-manageca',
  templateUrl: './manageca.component.html',
  styleUrls: ['./manageca.component.css'],

})
export class ManagecaComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'insuranceCompany', 'email'];
  displayedColumns2: string[] = ['select', 'firstName', 'lastName', 'insuranceCompany', 'email'];

  selectedItems: any[] = [];
  displaySelectedItemsFlag = false;
  inputValue: string = ''; 
  showContent: Boolean = false;
  isHoveredUp = false;
  isHoveredDown = false;
  rejectionObj = new rejectionObject(
  );
  

  dataSource!: MatTableDataSource<claimsAgentList>;
  databaseSource!: MatTableDataSource<PeriodicElement>;
  pendingDataSource!: MatTableDataSource<claimsAgentList>;
  approvedDataSource!: MatTableDataSource<claimsAgentList>;
  rejectedDataSource!: MatTableDataSource<claimsAgentList>;

  selection = new SelectionModel<claimsAgentList>(true, [], false);

  @ViewChild('pendingPaginator')
  pendingPaginator!: MatPaginator;
  @ViewChild('approvedPaginator')
  approvedPaginator!: MatPaginator;
  @ViewChild('rejectedPaginator')
  rejectedPaginator!: MatPaginator;

    ngAfterViewInit() {
      this.pendingDataSource.paginator = this.pendingPaginator;
      this.approvedDataSource.paginator = this.approvedPaginator;
      this.rejectedDataSource.paginator = this.rejectedPaginator;
    }

  getSelectedItems() {
    const selectedItems = this.selection.selected;
    const formattedItems = selectedItems.map((item) => {
      return {
       // ClaimsAgentId: item.claimsAgentId,
        InsuranceCompany: item.insuranceCompany,
        FirstName: item.firstName,
        LastName: item.lastName,
        Email: item.email,
        AccountStatus: item.accountStatus,
      };
    });
  
    return formattedItems;
  }
  
  

  hideContent(){
    this.showContent = false;
    this.changeDetectorRef.detectChanges();
    console.log('Show Content', this.showContent)
  }


 displaySelectedItems() {
  if (this.selection.selected.length > 0) {
    this.selectedItems = this.getSelectedItems();
    console.log('Selected items:', this.selectedItems);    
    this.displaySelectedItemsFlag = true;
  } else
   {
    this.selectedItems = [];
    this.changeDetectorRef.detectChanges();
    this.displaySelectedItemsFlag = false;
  }
  console.log('displaySelectedItemsFlag:', this.displaySelectedItemsFlag);
}

  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.pendingDataSource = new MatTableDataSource<claimsAgentList>();
    this.approvedDataSource = new MatTableDataSource<claimsAgentList>();
    this.rejectedDataSource = new MatTableDataSource<claimsAgentList>();
    this.dataSource = new MatTableDataSource<claimsAgentList>();
    this.loadCADetails();
  }

  refreshPage() {
    location.reload();
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

    toggleSingleSelection(row: claimsAgentList) {
      if (this.selection.isSelected(row)) {
        // If the row is already selected, unselect it
        this.selection.deselect(row);
      } else {
        // If the row is not selected, clear the selection and select the clicked row
        this.selection.clear();
        this.selection.select(row);
      }
    }


    approveAccount() {
      // Assuming you have a selected item
      if (this.selection.selected.length > 0) {
        const selectedItem = this.selection.selected[0]; // Assuming you are working with a single selected item

        const selectedEmail = selectedItem.email
        console.log(selectedEmail)

       
        this.authService.approveClaimsAgent(selectedEmail)
        .subscribe(
          (response) => {
            console.log("Success", response)
            console.log("Success")
            location.reload();
          },
          (error) => {
            console.log("Error",error)
            console.log("Fail")
          }
       );
      }
    }

    rejectAccount() {
      // Assuming you have a selected item
      if (this.selection.selected.length > 0) {
        const selectedItem = this.selection.selected[0]; // Assuming you are working with a single selected item
     
        const selectedEmail = selectedItem.email
        console.log(selectedEmail)

        this.rejectionObj.email = selectedEmail;
        const rejectionReason = this.rejectionObj.text;
        
        console.log("rejectionInfo", this.rejectionObj)

        this.authService.rejectClaimsAgent(this.rejectionObj)
        .subscribe(
          (response) => {
            console.log(response)
            console.log("Success")
            location.reload();
          },
          (error) => {
            console.log(error)
            console.log("Fail")
          }
       );
      }
    }

  loadCADetails() {
    this.authService.getClaimsAgent().subscribe(
      (response: any) => {
        console.log(response.data);

  
        const pendingUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Pending');
        console.log('Pending', pendingUsers);
      const approvedUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Approved');
      console.log('Approved', approvedUsers);

      const rejectedUsers = response.data.filter((user: claimsAgentList) => user.accountStatus === 'Rejected');
      console.log('Rejected', rejectedUsers);

        this.dataSource.data = response.data;
        this.pendingDataSource.data = pendingUsers;
      this.approvedDataSource.data = approvedUsers;
      this.rejectedDataSource.data = rejectedUsers;
      },
      (error) => {
        console.error('Error fetching claims agent details', error);
      }
    );
  }

}

