import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  private chart: am4charts.XYChart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: string, private zone: NgZone) {}

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartDiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits_1 = 10;
      let visits_2 = 10;
      let visits_3 = 10;

      for (let i = 1; i < 5000; i++) {
        visits_1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        visits_2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        visits_3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

        data.push({ 
          date: new Date(2010, 0, i), 
          name: "name" + i, 
          value1: visits_1,
          value2: visits_2,
          value3: visits_3,  
        });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      //valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.dateX = "date";
      series1.dataFields.valueY = "value1";
      series1.tooltipText = "{valueY.value1}";

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = "date";
      series2.dataFields.valueY = "value2";
      series2.tooltipText = "{valueY.value2}";

      let series3 = chart.series.push(new am4charts.LineSeries());
      series3.dataFields.dateX = "date";
      series3.dataFields.valueY = "value3";
      series3.tooltipText = "{valueY.value3}";

      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series1);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}