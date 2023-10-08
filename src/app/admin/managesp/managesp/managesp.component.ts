import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { serviceProviderList} from 'src/app/models/admin/serviceProviderList.model'
import { rejectionObject } from 'src/app/models/rejectionObject';
import { AuthService } from 'src/app/services/auth.service';

export interface PeriodicElement {
  registrationName: string;
  tradingName: string;
  contactPerson: string;
  cellNumber: string;
  telNumber: string;
  email: string;
  payeeType: string;
  type: string;
  companyRegistrationNumber:string;
  vatVendor: string;
  vatNumber: string;
}

const allowMultiSelect = true;
var ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-managesp',
  templateUrl: './managesp.component.html',
  styleUrls: ['./managesp.component.css']
})
export class ManagespComponent {
  displayedColumns: string[] = ['registrationName', 'tradingName', 'contactPerson', 'cellNumber',
                                'telNumber', 'email', 'payeeType', 'type', 'companyRegistrationNumber', 
                                'vatVendor', 'vatNumber'
                                ];
   displayedColumns2: string[] = ['select','registrationName', 'tradingName', 'contactPerson', 'cellNumber',
                                'telNumber', 'email', 'payeeType', 'type', 'companyRegistrationNumber',
                                'vatVendor', 'vatNumber'
                                ];
 selectedItems: any[] = [];
  displaySelectedItemsFlag = false;
  inputValue: string = ''; 
  showContent: Boolean = false;
  isHoveredUp = false;
   isHoveredDown = false;
   rejectionObj = new rejectionObject(
  );
  dataSource!: MatTableDataSource<serviceProviderList>;
  databaseSource!: MatTableDataSource<PeriodicElement>;
  pendingDataSource!: MatTableDataSource<serviceProviderList>;
  approvedDataSource!: MatTableDataSource<serviceProviderList>;
  rejectedDataSource!: MatTableDataSource<serviceProviderList>;

  selection = new SelectionModel<serviceProviderList>(true, [], false);

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
     registrationName: item.registrationName,
     tradingName: item.tradingName,
     contactPerson: item.contactPerson,
     cellNumber: item.cellNumber,
     telNumber: item.telNumber,
     email: item.email,
     payeeType: item.payeeType,
     type: item.type,
     companyRegistrationNumber: item.companyRegistrationNumber,
     vatVendor: item.vatVendor,
     vatNumber: item.vatNumber

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
    this.dataSource = new MatTableDataSource<serviceProviderList>();
    this.pendingDataSource = new MatTableDataSource<serviceProviderList>();
    this.approvedDataSource = new MatTableDataSource<serviceProviderList>();
    this.rejectedDataSource = new MatTableDataSource<serviceProviderList>();
    this.loadServiceProviderDetails();
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

    toggleSingleSelection(row: serviceProviderList) {
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
       
        this.authService.approveServiceProvider(selectedEmail)
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

  
  loadServiceProviderDetails() {
    this.authService.getServiceProviders().subscribe(
      (response: any) => {
        console.log(response.data);

        const pendingUsers = response.data.filter((user: serviceProviderList) => user.accountStatus === 'Pending');
        console.log('Pending', pendingUsers);
      const approvedUsers = response.data.filter((user: serviceProviderList) => user.accountStatus === 'Approved');
      console.log('Approved', approvedUsers);

      const rejectedUsers = response.data.filter((user: serviceProviderList) => user.accountStatus === 'Rejected');
      console.log('Rejected', rejectedUsers);

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

