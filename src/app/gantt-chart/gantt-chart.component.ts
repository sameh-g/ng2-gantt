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
  color1: string = "#99cc99";
  position1: string = '';
  width1: string = '';

  //Bar2
  color2: string = "#33cc33";//#ff0000
  position2: string = '';
  width2: string = '';

  //Bar3
  color3: string = "#669933";
  position3: string = '';
  width3: string = '';

  //Bar4
  color4: string = "#990000";
  position4: string = '';
  width4: string = '';

  ngOnInit() {
  }


  //This method should return an object with {color and Width for each 4 bar charts per one..} calculated 
  calculateGantt(gannt: Gantt): any {
    var midBarStart: number = 0;
    var midBarEnd: number = 0;

    //Calculated Bar1
    if (gannt.Date1Day > gannt.Date3Day) {
      this.width1 = this.getPositionPercentage(gannt.Date1Day - gannt.Date3Day);
      this.position1 = this.getPositionPercentage(gannt.Date3Day);
      midBarStart = gannt.Date1Day;
    }
    else {
      this.width1 = this.getPositionPercentage(gannt.Date3Day - gannt.Date1Day);
      this.position1 = this.getPositionPercentage(gannt.Date1Day);
      midBarStart = gannt.Date3Day;
      console.log('Bar1 postion', this.position1)
      console.log('Bar1 width0', this.width1)
    }

    //Calculated Bar3

    if (gannt.Date2Day > gannt.Date4Day) {
      this.width3 = this.getPositionPercentage(gannt.Date2Day - gannt.Date4Day);
      this.position3 = this.getPositionPercentage(gannt.Date4Day);
      midBarEnd=gannt.Date4Day;
    }
    else {
      this.width3 = this.getPositionPercentage(gannt.Date4Day - gannt.Date2Day);
      this.position3 = this.getPositionPercentage(gannt.Date2Day);
      midBarEnd=gannt.Date2Day;
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
