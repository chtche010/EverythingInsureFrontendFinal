import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

export interface PeriodicElement {
  jobDescription: string;
  bidTotalMaterialCost: number;
  bidTotalLabourCost: number;
  bidTotalCost: number;
  bidEstimatedDuration: string;
  auction: string; 
  serviceProvider: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-managebid',
  templateUrl: './managebid.component.html',
  styleUrls: ['./managebid.component.css']
})
export class ManagebidComponent implements OnInit {
  data: any;
  displayedColumns: string[] = ['auctionTitle', 'auctionDate', 'claimsAgent', 'reason'];
  dataSource = ELEMENT_DATA;

  constructor(
    private authService: AuthService) {   
     }
     ngOnInit(): void {
      this.getRejectedBids();
    }

      getRejectedBids(){
        this.authService.getRejectedBid().subscribe(
          (response: any) => {
            console.log('View Rejected Bids', response);
            console.log(response.data)
          },
          error => {
            console.log('Error viwewing rejected bids:', error);
          }
        );
      }    
      }

