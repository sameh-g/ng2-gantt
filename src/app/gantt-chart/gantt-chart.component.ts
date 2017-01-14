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
    this.calculateGanttChart(this._gantt);

  }

  //Bar1
  color1: string = "";
  position1: string = '';
  width1: string = '';

  //Start Dates Bar (Bar1)
  StartActualDifferenceBarColor: string = "";
  StartActualBarCapacity: string = "";
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

  ForcastedEndDateBarColor: string = "";
  ForcastedBarEndDateBarCapacity: string = "";
  ForcastedBarEndDateBarStartPosition: string = "";


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
      this.ProgressBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      //Color of Start Vs Actula should be removed.. 
      console.log("ProgressBarStartPosition", this.ProgressBarStartPosition);
    }
    //In Case Actual Start Date is after the Start Date..
    else if (gannt.StartDateDay <= gannt.ActualStartDateDay) {
      var startActualDateDiff = gannt.ActualStartDateDay - gannt.StartDateDay;
      //Change Status value the color between the dates is a shade lighter than the remaining of the bar
      StartProgressBar = gannt.ActualStartDateDay;
      this.ProgressBarStartPosition = this.getValuePercentageInYear(gannt.ActualStartDateDay);
      this.StartActualBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      this.StartActualBarCapacity = this.getValuePercentageInYear(startActualDateDiff);

      console.log("actual after start StartActualBarStartPosition", this.StartActualBarStartPosition);
      console.log("actual after start  StartActualBarCapacity", this.StartActualBarCapacity);
      console.log("actual after start  ProgressBarStartPosition", this.ProgressBarStartPosition);
    }

    //In case the start date is after the Actual start date
    else if (gannt.StartDateDay >= gannt.ActualStartDateDay) {
      var startEndDateDiff = gannt.StartDateDay - gannt.ActualStartDateDay;
      //Change Status Value for Color Differnece will  be the dates is a shade darker than the remaining of the bar
      StartProgressBar = gannt.ActualStartDateDay;
      this.ProgressBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      this.StartActualBarStartPosition = this.getValuePercentageInYear(gannt.ActualStartDateDay);
      this.StartActualBarCapacity = this.getValuePercentageInYear(startEndDateDiff);

      console.log("start after actual StartActualBarStartPosition", this.StartActualBarStartPosition);
      console.log("start after actual  StartActualBarCapacity", this.StartActualBarCapacity);
      console.log("start after actual  ProgressBarStartPosition", this.ProgressBarStartPosition);
    }

    //If there is an Actual End date in the selected time period, the color will take the whole bar till the Actual End date
    if (gannt.ActualEndDateDay > 0) {
      this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
        StartProgressBar, gannt.ActualEndDateDay))
      console.log(" with actual end date ProgressBarCapacity till the actual end date ", this.ProgressBarCapacity)
    }
    //If there is no Actual end in the time period selected the color will take the whole bar till the end date
    else if (gannt.ActualEndDateDay == 0) {
      this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
        StartProgressBar, gannt.EndDateDay))
      console.log(" no actual end date ProgressBarCapacity till the end date ", this.ProgressBarCapacity)

    }

    //If there is a Forecasted date in the selected time period and actual start date, 
    //the color will take 40% of the bar from Actual Start date to the Forecasted date
    // If there is a  Forecasted date in the selected time period and No actual start date ,
    //the color will take 40% of the bar from Start date to the Forecasted date
    //Already start progress bar adjusted.. 
    if (gannt.ForcastDay > 0) {
      this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
        StartProgressBar, gannt.ForcastDay))
      console.log(" forcasted & actual start ProgressBarCapacity", this.ProgressBarCapacity)
    }
    //If there is No  Forecasted date in the selected time period and actual start date , 
    //the color will take 40% of the bar from Actual Start date to End date
    //If there is No Forecasted date in the selected time period and No actual start date , 
    //the colour will take 40% of the bar from Start date to the End date




    //Case Forcast
    if (gannt.ForcastDay > 0) {
      if (gannt.ForcastDay > gannt.EndDateDay) {
        this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
        this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.ForcastDay - gannt.EndDateDay);

        //Calculated Bar3
        this.EndDateStartPosition = this.getValuePercentageInYear(this.StartProgress + this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.ForcastDay));
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - (this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.ForcastDay) + this.StartProgress))

      }
      else {
        this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(gannt.ForcastDay);
        this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - gannt.ForcastDay);
      }
    }
    {
      //Calculated Bar3
      this.EndDateStartPosition = this.getValuePercentageInYear(this.StartProgress + this.calculateProgressWidth(gannt.Progress,
        this.StartProgress, gannt.EndDateDay));
      this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - (this.calculateProgressWidth(gannt.Progress,
        this.StartProgress, gannt.EndDateDay) + this.StartProgress))

    }
    this.calculateGanttStatusColor(gannt);

  }

  calculateGanttStatus(gannt: Gantt): any {
    if (gannt.Status == 1) {
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
    
      if (gannt.ActualStartDateDay == 0) {
        this.StartActualDifferenceBarColor = "";
        console.log('empty StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)
      }

      else if (gannt.StartDateDay >= gannt.ActualStartDateDay) {
        this.StartActualDifferenceBarColor =(gannt.Status==1)? "#006400":(gannt.Status==2)?"#b78038":"#7f0000";
        console.log('darker StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)

      }
      else if (gannt.StartDateDay <= gannt.ActualStartDateDay) {
        this.StartActualDifferenceBarColor = (gannt.Status==1)? "#d9ecc3":(gannt.Status==2)?"#f4d9b5":"#FA8072";
        console.log('lighter StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)
      }

      this.ProgressBarColor = (gannt.Status==1)? "#7fbe35":(gannt.Status==2)?"#e5a046":"#D54147";
      this.EndDateBarColor = (gannt.Status==1)? "#cfcfcf":(gannt.Status==2)?"#f9ecda":"#ff4c4c";
      this.ForcastedEndDateBarColor =(gannt.Status==1)? "#ababab":(gannt.Status==2)?"#f4d9b5":"#7f0000";
    
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
