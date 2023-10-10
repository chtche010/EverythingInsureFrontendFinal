import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
 

@Component({

  selector: 'app-ca-report-dash',

  templateUrl: './ca-report-dash.component.html',

  styleUrls: ['./ca-report-dash.component.css']

})

export class CaReportDashComponent implements OnInit{
  public totalClaims!: number ;

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
  }


  getRndomIntInclusive(min: number, max: number) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

 

  getRandomIntInclusive(min: number, max: number) {

    min = Math.ceil(min);

    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

randomPendingAuctions = this.getRandomIntInclusive(1, 10);

randomAvgBids = this.getRandomIntInclusive(15, 35);

}