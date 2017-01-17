import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ChartModule} from 'angular2-highcharts'
import { AppComponent } from './app.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { BarchartComponent } from './gantt-chart/barchart/barchart.component';
import {GanttModule} from './gantt-chart/gantt-chart.module';

@NgModule({
  declarations: [
    AppComponent,
     //GanttChartComponent,
     //BarchartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    GanttModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
