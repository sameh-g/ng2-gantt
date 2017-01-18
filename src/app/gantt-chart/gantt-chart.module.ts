
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttChartComponent } from './gantt-chart.component';
import { BarchartComponent } from './barchart/barchart.component';

@NgModule({
    imports: [
         CommonModule
    ],
    exports: [
        GanttChartComponent,
        BarchartComponent
    ],
    declarations: [
        GanttChartComponent,
        BarchartComponent
    ],


})
export class GanttModule { }
