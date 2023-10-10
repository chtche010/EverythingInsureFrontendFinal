import { Component } from '@angular/core';

import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

 

@Component({

  selector: 'app-ca-bar',

  templateUrl: './ca-bar.component.html',

  styleUrls: ['./ca-bar.component.css']

})

export class CaBarComponent {

  public barChartOptions: ChartOptions = {

    responsive: true,

    scales: {

      y: {

        beginAtZero: true,

        max: 50

      }

    }

  };

  public barChartLabels: string[] = ['2021 | Hilux', '2018 | Toyota', '2016 | BMW', '2020 | Mercedes', '2015 | Honda'];

  public barChartType: ChartType = 'bar';

  public barChartLegend = true;

  public barChartPlugins = [];

  public barChartData: ChartDataset[] = [

    { data: [25, 15, 35, 45, 30], label: 'Total Bids',

    backgroundColor: [

      'rgba(255, 99, 132, 0.2)',

      'rgba(255, 159, 64, 0.2)',

      'rgba(75, 192, 192, 0.2)',

      'rgba(54, 162, 235, 0.2)',

      'rgba(153, 102, 255, 0.2)'

    ],

    borderColor: [

      'rgb(255, 99, 132)',

      'rgb(255, 159, 64)',

      'rgb(75, 192, 192)',

      'rgb(54, 162, 235)',

      'rgb(153, 102, 255)'

    ],

    borderWidth: 1

  }]

  ;

}