import { Component, OnInit } from '@angular/core';

import { dataSeries } from "../charts.data";

@Component({
  selector: 'app-ngx-echarts',
  templateUrl: './ngx-echarts.component.html',
  styleUrls: ['./ngx-echarts.component.css']
})
export class NgxEchartsComponent implements OnInit {
  
  options: any;
  updateOptions: any;

  private now!: Date;
  private data!: any[];

  constructor() { }

  ngOnInit(): void {
    this.data = [];

    for (let i = 0; i < 120; i++) {
      this.data.push(this.randomData(i));
    }

    // initialize chart options:
    this.options = {
      title: {
        text: 'Stock Price Movement'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'XYZ Motors',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.data
      }]
    };
  }

  randomData(index: number) {
    this.now = new Date(dataSeries[1][index].date);
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.floor(dataSeries[1][index].value/1000000)
      ]
    };
  }

}
