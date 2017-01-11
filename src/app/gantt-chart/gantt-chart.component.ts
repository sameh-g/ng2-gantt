import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],


})
export class GanttChartComponent implements OnInit {
  color: string = "---color--";
  from: number = 0;
  to: number = 50;

  constructor() { }

  ngOnInit() {
  }

}
