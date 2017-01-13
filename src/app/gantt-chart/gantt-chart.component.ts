import { Component, OnInit, Input } from '@angular/core';
import { Gantt } from "./ganttModel"

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],


})
export class GanttChartComponent implements OnInit {

  private _gantt: Gantt;
  constructor() {
  }

  @Input('gantt') set gantt(gantt) {
    this._gantt = gantt;
    this.calculateGantt(this._gantt)
  
    console.log(gantt)
  }

  //Bar1
  color1: string = "";
  position1: string = '';
  width1: string = '';

  //Bar2
  color2: string = "";
  position2: string = '';
  width2: string = '';

  //Bar3
  color3: string = "";
  position3: string = '';
  width3: string = '';

  //Bar4
  color4: string = "";
  position4: string = '';
  width4: string = '';

  StartProgress: number = 0;
  EndProgress: number = 0;

  ngOnInit() {
  }


  //This method should return an object with {color and Width for each 4 bar charts per one..} calculated 
  calculateGantt(gannt: Gantt): any {

    //Calculated Bar1
    if (gannt.StartPlannedDay > gannt.StartActualDay) {
      this.width1 = this.getPositionPercentage(gannt.StartPlannedDay - gannt.StartActualDay);
      this.position1 = this.getPositionPercentage(gannt.StartActualDay);
      this.StartProgress = gannt.StartPlannedDay;
    }
    else {
      this.width1 = this.getPositionPercentage(gannt.StartActualDay - gannt.StartPlannedDay);
      this.position1 = this.getPositionPercentage(gannt.StartPlannedDay);
      this.StartProgress = gannt.StartActualDay;
    }

    //Calculated Bar2 progress 
    this.position2 = this.getPositionPercentage(this.StartProgress);
    this.width2 = this.getPositionPercentage(this.calculateProgressWidth(gannt.Progress,
      this.StartProgress, gannt.ForcastDay))


    //Calculated Bar3
    this.position3 = this.getPositionPercentage(this.StartProgress + this.calculateProgressWidth(gannt.Progress,
      this.StartProgress, gannt.ForcastDay));
    this.width3 = this.getPositionPercentage(gannt.EndActualDay-(this.calculateProgressWidth(gannt.Progress,
    this.StartProgress, gannt.ForcastDay)+this.StartProgress))

    //Case Forcast
    this.position4 = this.getPositionPercentage(gannt.EndActualDay);
    this.width4 = this.getPositionPercentage(gannt.ForcastDay - gannt.EndActualDay);


   this.calculateGanttStatus(gannt);
    console.log('forcast case ')
    console.log('ForcastDay ', gannt.ForcastDay)
    console.log('EndPlannedDay ', gannt.EndPlannedDay)
    console.log('position2', this.position2)
    console.log('width2 ', this.width2)
    console.log('width3 ', this.width3)
    console.log('this.StartProgress', this.StartProgress)
    console.log('gannt.Progress ', gannt.Progress)
  }
  
calculateGanttStatus(gannt:Gantt):any{

  if(gannt.Status==1)
  {
    this.color1="#d9ecc3";
    this.color2="#7fbe35";
    this.color3="#cfcfcf";
    this.color4="#ababab";
  }
  else if(gannt.Status==2)
  {
    this.color1="#FACECF";
    this.color2="#D54147";
    this.color3="#9E4B4C";

    // if(gannt.ForcastDay!=NaN)
    //     this.color4="#ababab";
  }
    else
  {
    this.color1="#E5A046";
    this.color2="#E5A046";
    this.color3="#FAD9AC";
   // this.color4="#ababab";
  }


}
  getPositionPercentage(position: number): string {
    return ((position * 100) / 365).toString() + '%';
  }

  calculateProgressWidth(progress: number, start: number, end: number): any {
    console.log('progress,start,end', progress, start, end)
    var capacity = end - start;
    var progress = ((progress * capacity) / 100) //+ start
    console.log('prgress', progress);
    return progress;

  }


}
