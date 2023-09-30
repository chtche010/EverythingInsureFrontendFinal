import { Component } from '@angular/core';


@Component({
  selector: 'app-ca-report-dash',
  templateUrl: './ca-report-dash.component.html',
  styleUrls: ['./ca-report-dash.component.css']
})
export class CaReportDashComponent {
  getRandomWholeNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRndomIntInclusive(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

randomTotalClaims = this.getRandomWholeNumber(1, 100);
randomPendingAuctions = this.getRandomIntInclusive(1, 10);
randomAvgBids = this.getRandomIntInclusive(15, 35);

}
