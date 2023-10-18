import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
 

@Component({

  selector: 'app-ca-report-dash',

  templateUrl: './ca-report-dash.component.html',

  styleUrls: ['./ca-report-dash.component.css']

})

export class CaReportDashComponent implements OnInit{
  public totalClaims!: number ;
  public totalUpcomingAuctions: number = 0;
  public averageNumberOfBids: string = '0.00';

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getCountClaims().subscribe(
      (response: any) => {
        this.totalClaims = response.data;
      },
      (error: any) => {
        console.error('Error retrieving count of claims:', error);
      }
    );

    this.authService.getCountUpcomingAuctions().subscribe(
      (response: any) => {
        this.totalUpcomingAuctions = response.data;
      },
      (error: any) => {
        console.error('Error retrieving count of upcoming auctions:', error);
      }
    );

    this.authService.getAverageNumberOfBids().subscribe(
      (response: any) => {
        this.averageNumberOfBids = response.data.toFixed(2);
      },
      (error: any) => {
        console.error('Error retrieving average number of bids:', error);
      }
    );
  }

}