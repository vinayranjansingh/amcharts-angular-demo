import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './am-charts/chart.component';
import { ApexChartsComponent } from './apex-charts/apex-charts.component';
import { NgxEchartsComponent } from './ngx-echarts/ngx-echarts.component';

const routes: Routes = [
  { path: 'amCharts', component: ChartComponent },
  { path: 'apexCharts', component: ApexChartsComponent },
  { path: 'eCharts', component: NgxEchartsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
