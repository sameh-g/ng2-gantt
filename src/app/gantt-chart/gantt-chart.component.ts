import { Component, OnInit, Input } from '@angular/core';
import { Gantt } from "./ganttModel"

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],


})
export class GanttChartComponent implements OnInit {
  
private  _gantt:Gantt;
  constructor() {
  }

 @Input('gantt') set gantt(gantt) {
    this._gantt = gantt;
    this.calculateGantt(this._gantt)
    console.log(gantt)
  }
  
  //Bar1
  color1: string = "#d9ecc3";
  position1: string = '';
  width1: string = '';

  //Bar2
  color2: string = "#7fbe35";
  position2: string = '';
  width2: string = '';

  //Bar3
  color3: string = "#cfcfcf";
  position3: string = '';
  width3: string = '';

  //Bar4
  color4: string = "#ababab";
  position4: string = '';
  width4: string = '';

  ngOnInit() {
  }


  //This method should return an object with {color and Width for each 4 bar charts per one..} calculated 
  calculateGantt(gannt: Gantt): any {
    var midBarStart: number = 0;
    var midBarEnd: number = 0;

    //Calculated Bar1
    if (gannt.StartPlannedDay > gannt.StartActualDay) {
      this.width1 = this.getPositionPercentage(gannt.StartPlannedDay - gannt.StartActualDay);
      this.position1 = this.getPositionPercentage(gannt.StartActualDay);
      midBarStart = gannt.StartPlannedDay;
    }
    else {
      this.width1 = this.getPositionPercentage(gannt.StartActualDay - gannt.StartPlannedDay);
      this.position1 = this.getPositionPercentage(gannt.StartPlannedDay);
      midBarStart = gannt.StartActualDay;
      console.log('Bar1 postion', this.position1)
      console.log('Bar1 width0', this.width1)
    }

    //Calculated Bar3

    if (gannt.EndPlannedDay > gannt.EndActualDay) {
      this.width3 = this.getPositionPercentage(gannt.EndPlannedDay - gannt.EndActualDay);
      this.position3 = this.getPositionPercentage(gannt.EndActualDay);
      midBarEnd=gannt.EndActualDay;
    }
    else {
      this.width3 = this.getPositionPercentage(gannt.EndActualDay - gannt.EndPlannedDay);
      this.position3 = this.getPositionPercentage(gannt.EndPlannedDay);
      midBarEnd=gannt.EndPlannedDay;
      console.log('Bar3 position3', this.position3)
      console.log('Bar3 width3', this.width3)
    }


    //Calculated Bar2
    this.position2 = this.getPositionPercentage(midBarStart);
    this.width2 = this.getPositionPercentage(midBarEnd-midBarStart);

    console.log('Bar2 position2', this.position2)
    console.log('Bar2 width2', this.width2)

  }

  getPositionPercentage(position: number): string {
    return ((position * 100) / 365).toString() + '%';
  }

}
