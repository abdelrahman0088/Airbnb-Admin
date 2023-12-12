import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [8, 7, 6, 6, 7, 7, 7, 6, 6, 6, 7, 6, 7, 7, 7],
      chart: {
        type: "donut"
      },
      labels: ["Beach", "Wind", "Modern", "Country", "Pools", "Islands", "Lakes", "Skiing", "Castels", "Caves", "Camp", "Arctic", "Desert", "Barns", "Lux"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
