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
    this.calculateGanttChart(this._gantt);
    console.log(gantt)
  }

  //Bar1
  color1: string = "";
  position1: string = '';
  width1: string = '';

  //Start Dates Bar (Bar1)
  StartActualDifferenceBarColor: string = "";
  StartVsActualBarCapacity: string = "";
  StartActualBarStartPosition: string = "";

  //Bar2 Progress
  color2: string = "";
  position2: string = '';
  width2: string = '';

  //Progress Bar (Bar2)
  ProgressBarColor: string = "";
  ProgressBarCapacity: string = "";
  ProgressBarStartPosition: string = "";

  //Bar3
  color3: string = "";
  position3: string = '';
  width3: string = '';

  //Remaining Bar (Bar3)
  EndDateBarColor: string = "";
  EndDateBarCapacity: string = "";
  EndDateStartPosition: string = "";

  //Forcasted Bar (Bar4)
  color4: string = "";
  position4: string = '';
  width4: string = '';

  ForcastedVsEndDateBarColor: string = "";
  ForcastedBarVsEndDateBarCapacity: string = "";
  ForcastedBarVsEndDateBarStartPosition: string = "";


  StartProgress: number = 0;
  EndProgress: number = 0;

  ngOnInit() {
  }


  //This method should return an object with {color and Width for each 4 bar charts per one..} calculated 
  calculateGantt(gannt: Gantt): any {

    if (gannt.StartDateDay > gannt.ActualStartDateDay) {
      this.width1 = this.getPositionPercentage(gannt.StartDateDay - gannt.ActualStartDateDay);
      this.position1 = this.getPositionPercentage(gannt.ActualStartDateDay);
      this.StartProgress = gannt.StartDateDay;
    }
    else {
      this.width1 = this.getPositionPercentage(gannt.ActualStartDateDay - gannt.StartDateDay);
      this.position1 = this.getPositionPercentage(gannt.StartDateDay);
      this.StartProgress = gannt.ActualStartDateDay;
    }

    //Calculated Bar2 progress 
    this.position2 = this.getPositionPercentage(this.StartProgress);
    this.width2 = this.getPositionPercentage(this.calculateProgressWidth(gannt.Progress,
      this.StartProgress, gannt.ForcastDay))


    //Calculated Bar3
    this.position3 = this.getPositionPercentage(this.StartProgress + this.calculateProgressWidth(gannt.Progress,
      this.StartProgress, gannt.ForcastDay));
    this.width3 = this.getPositionPercentage(gannt.ActualEndDateDay - (this.calculateProgressWidth(gannt.Progress,
      this.StartProgress, gannt.ForcastDay) + this.StartProgress))

    //Case Forcast
    this.position4 = this.getPositionPercentage(gannt.ActualEndDateDay);
    this.width4 = this.getPositionPercentage(gannt.ForcastDay - gannt.ActualEndDateDay);


    this.calculateGanttStatus(gannt);
    // console.log('forcast case ')
    // console.log('ForcastDay ', gannt.ForcastDay)
    // console.log('EndDateDay ', gannt.EndDateDay)
    // console.log('position2', this.position2)
    // console.log('width2 ', this.width2)
    // console.log('width3 ', this.width3)
    // console.log('this.StartProgress', this.StartProgress)
    // console.log('gannt.Progress ', gannt.Progress)
  }
  calculateGanttChart(gannt: Gantt): any {

    var StartProgressBar: number = 0;
    var EndProgressBar: number = 0;

    // In case there is no Actual start date, the bar will take the color starting the start date.
    if (gannt.ActualStartDateDay == 0) {
      this.StartActualBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      //Color of Start Vs Actula should be removed.. 
      console.log("*************StartActualBarStartPosition********", this.StartActualBarStartPosition);
    }


    //In Case Actual Start Date is after the Start Date..
    else if (gannt.StartDateDay < gannt.ActualStartDateDay) {
      var startEndDateDiff = gannt.ActualStartDateDay - gannt.StartDateDay;
      //Change Status value the color between the dates is a shade lighter than the remaining of the bar
      this.StartActualBarStartPosition = this.getValuePercentageInYear(gannt.ActualStartDateDay);
      this.StartVsActualBarCapacity = this.getValuePercentageInYear(startEndDateDiff);
      console.log("****Actuale after start *******StartActualBarStartPosition********", this.StartActualBarStartPosition);
    }

    //In case the start date is after the Actual start date
    else if (gannt.StartDateDay > gannt.ActualStartDateDay) {
      var startEndDateDiff = gannt.StartDateDay - gannt.StartDateDay;
      //Change Status Value for Color Differnece will  be the dates is a shade darker than the remaining of the bar
      this.StartActualBarStartPosition = this.getValuePercentageInYear(startEndDateDiff);
      console.log("****Start after Actual *******StartActualBarStartPosition********", this.StartActualBarStartPosition);
    }



  }

  calculateGanttStatus(gannt: Gantt): any {
    if (gannt.Status == 1) {
    //  if(gannt.ActualStartDateDay==0)
    //     this.color1 = "";
    //   else if (gannt.StartDateDay > gannt.ActualStartDateDay)
    //     this.color1 = "#006400";
    //   else if (gannt.StartDateDay < gannt.ActualStartDateDay)
        this.color1 = "#d9ecc3";
 

      this.color2 = "#7fbe35";
      this.color3 = "#cfcfcf";
      this.color4 = "#ababab";
    }
    else if (gannt.Status == 2) {
      this.color1 = "#FACECF";
      this.color2 = "#D54147";
      this.color3 = "#9E4B4C";

      // if(gannt.ForcastDay!=NaN)
      //     this.color4="#ababab";
    }
    else {
      this.color1 = "#E5A046";
      this.color2 = "#E5A046";
      this.color3 = "#FAD9AC";
      // this.color4="#ababab";
    }


  }
  calculateGanttStatusColor(gannt: Gantt): any {
    if (gannt.Status == 1) {
    //  if(gannt.ActualStartDateDay==0)
    //     this.color1 = "";
    //   else if (gannt.StartDateDay > gannt.ActualStartDateDay)
    //     this.color1 = "#006400";
    //   else if (gannt.StartDateDay < gannt.ActualStartDateDay)
        this.color1 = "#d9ecc3";
 

      this.color2 = "#7fbe35";
      this.color3 = "#cfcfcf";
      this.color4 = "#ababab";
    }
    else if (gannt.Status == 2) {
      this.color1 = "#FACECF";
      this.color2 = "#D54147";
      this.color3 = "#9E4B4C";

      // if(gannt.ForcastDay!=NaN)
      //     this.color4="#ababab";
    }
    else {
      this.color1 = "#E5A046";
      this.color2 = "#E5A046";
      this.color3 = "#FAD9AC";
      // this.color4="#ababab";
    }


  }
  getPositionPercentage(position: number): string {
    return ((position * 100) / 365).toString() + '%';
  }

  getValuePercentageInYear(value: number): string {
    return ((value * 100) / 365).toString() + '%';
  }

  calculateProgressWidth(progress: number, start: number, end: number): any {
    // console.log('progress,start,end', progress, start, end)
    var capacity = end - start;
    var progress = ((progress * capacity) / 100) //+ start
    //  console.log('prgress', progress);
    return progress;

  }


}
