import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],


})
export class GanttChartComponent implements OnInit {
  color: string = "#000";
  from: string = '';
  to: string = '50%';

  //   color: string = "#000";
  // from: string = '';
  // to: string = '50%';

  //   color: string = "#000";
  // from: string = '';
  // to: string = '50%';

  constructor() { }

  ngOnInit() {
  }

}
