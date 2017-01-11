import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],


})
export class GanttChartComponent implements OnInit {
  color: string = "#000";
  from: string = '';
  to: string = '10%';

  color1: string = "#ff0000";
  from1: string = '';
  to1: string = '80%';

  color2: string = "#7CFC00	";
  from2: string = '';
  to2: string = '70%';

  color3: string = "#BDB76B";
  from3: string = '';
  to3: string = '40%';

  constructor() { }

  ngOnInit() {
  }

}
