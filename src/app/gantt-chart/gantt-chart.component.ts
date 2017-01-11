import { Component, OnInit, Input } from '@angular/core';
import { Gantt } from "./../ganttModel"

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],


})
export class GanttChartComponent implements OnInit {

  /**
   *
   */
  _gantt:Gantt;
  constructor() {

  }
 @Input('gantt') set gantt(gantt) {
    this._gantt = gantt;
    this.calculateGantt(this._gantt)
    console.log(gantt)
  }
  //Bar1
  color: string = "#000";
  position: string = '';
  width0: string = '';

  //Bar2
  color1: string = "#ff0000";
  position1: string = '';
  width1: string = '';

  //Bar3
  color2: string = "#7CFC00	";
  position2: string = '';
  width2: string = '';

  //Bar4
  color3: string = "#BDB76B";
  position3: string = '';
  width3: string = '';

  ngOnInit() {
  }


  //This method should return an object with {color and Width for each 4 bar charts per one..} calculated 
  calculateGantt(gannt: Gantt): any {
    var midBarStart: number = 0;
    var midBarEnd: number = 0;

    //Calculated Bar1
    if (gannt.Date1Day > gannt.Date3Day) {
      this.width0 = this.getPositionPercentage(gannt.Date1Day - gannt.Date3Day);
      this.position = this.getPositionPercentage(gannt.Date3Day);
      midBarStart = gannt.Date1Day;
    }
    else {
      this.width0 = this.getPositionPercentage(gannt.Date3Day - gannt.Date1Day);
      this.position = this.getPositionPercentage(gannt.Date1Day);
      midBarStart = gannt.Date3Day;
      console.log('Bar1 postion', this.position)
      console.log('Bar1 width0', this.width0)
    }

    //Calculated Bar3

    if (gannt.Date2Day > gannt.Date4Day) {
      this.width2 = this.getPositionPercentage(gannt.Date2Day - gannt.Date4Day);
      this.position2 = this.getPositionPercentage(gannt.Date4Day);
      midBarEnd=gannt.Date4Day;
    }
    else {
      this.width2 = this.getPositionPercentage(gannt.Date4Day - gannt.Date2Day);
      this.position2 = this.getPositionPercentage(gannt.Date2Day);
      midBarEnd=gannt.Date2Day;
      console.log('Bar3 position2', this.position2)
      console.log('Bar3 width2', this.width2)
    }


    //Calculated Bar2
    this.position1 = this.getPositionPercentage(midBarStart);
    this.width1 = this.getPositionPercentage(midBarEnd-midBarStart);

    console.log('Bar2 position1', this.position1)
    console.log('Bar2 width1', this.width1)

  }

  getPositionPercentage(position: number): string {
    return ((position * 100) / 365).toString() + '%';
  }



}
