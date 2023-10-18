import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ca-bar',
  templateUrl: './ca-bar.component.html',
  styleUrls: ['./ca-bar.component.css']
})
export class CaBarComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataset[] = [
    { 
      data: [], 
      label: 'Total Number of Bids',
      barPercentage: 0.5,
      categoryPercentage: 1,
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }
  ];

  constructor(private authService: AuthService) { }
  generateRandomColor(): { backgroundColor: string, borderColor: string } {
    var o = Math.round, r = Math.random, s = 255;
    var rValue = o(r()*s);
    var gValue = o(r()*s);
    var bValue = o(r()*s);
    
    var backgroundColor = 'rgba(' + rValue + ',' + gValue + ',' + bValue + ',0.2)';
    
    // Decrease the R, G, and B values by 30% to create a darker color
    var borderColor = 'rgba(' + o(rValue*0.7) + ',' + o(gValue*0.7) + ',' + o(bValue*0.7) + ',1)';
    
    return { backgroundColor: backgroundColor, borderColor: borderColor };
  }
  
  
  ngOnInit(): void {
    this.authService.getUserAuctionStats().subscribe((data: any) => {
      this.barChartData[0].data = data.data.map((item: any) => item.numberOfBids);
      this.barChartLabels = data.data.map((item: any) => item.auctionTitle);
      //generate color for each data point
      var colors = data.data.map(() => this.generateRandomColor());
    this.barChartData[0].backgroundColor = colors.map((color: { backgroundColor: string, borderColor: string }) => color.backgroundColor);
    this.barChartData[0].borderColor = colors.map((color: { backgroundColor: string, borderColor: string }) => color.borderColor);
    });
  }
}