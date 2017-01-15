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
    console.log(gantt)
    this.calculateGanttChart(this._gantt);

  }



  //Start Dates Bar (Bar1)
  StartActualDifferenceBarColor: string = "";
  StartActualBarCapacity: string = "";
  StartActualBarStartPosition: string = "";


  //Progress Bar (Bar2)
  ProgressBarColor: string = "";
  ProgressBarCapacity: string = "";
  ProgressBarStartPosition: string = "";



  //Remaining Bar (Bar3)
  EndDateBarColor: string = "";
  EndDateBarCapacity: string = "";
  EndDateStartPosition: string = "";


  ForcastedEndDateBarColor: string = "";
  ForcastedBarEndDateBarCapacity: string = "";
  ForcastedBarEndDateBarStartPosition: string = "";


  StartProgress: number = 0;
  EndProgress: number = 0;

  ngOnInit() {
  }




  calculateGanttChart(gannt: Gantt): any {

    var StartProgressBar: number = 0;
    var EndProgressBar: number = 0;

    // In case there is no Actual start date, the bar will take the color starting the start date.
    if (gannt.ActualStartDateDay == 0) {
      this.ProgressBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      StartProgressBar = gannt.StartDateDay;
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


    //Case Forcast Actuale And END Dates 
    if (gannt.ForcastDay > 0 && gannt.Progress != 100) {
      //Calculate Progress 
      var progressCapacity = this.calculateProgressWidth(gannt.Progress, StartProgressBar, gannt.ForcastDay)
      EndProgressBar = StartProgressBar + progressCapacity;

      if (gannt.ForcastDay > gannt.EndDateDay) {

        this.ProgressBarCapacity = this.getValuePercentageInYear(progressCapacity)
        console.log(EndProgressBar, gannt.EndDateDay)
        if (EndProgressBar >= gannt.EndDateDay) {
          this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(EndProgressBar);
          this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.ForcastDay - EndProgressBar);

          this.ProgressBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - StartProgressBar)

          this.EndDateStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
          this.EndDateBarCapacity = this.getValuePercentageInYear(EndProgressBar - gannt.EndDateDay);
          console.log('case endprogress bar > end date ', this.ForcastedBarEndDateBarStartPosition)
        }
        else if (EndProgressBar < gannt.EndDateDay) {
          this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
          this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.ForcastDay - gannt.EndDateDay);

          this.ProgressBarCapacity = this.getValuePercentageInYear(EndProgressBar - StartProgressBar)

          this.EndDateStartPosition = this.getValuePercentageInYear(EndProgressBar);
          this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - EndProgressBar);
        }


      }
      else if (gannt.ForcastDay < gannt.EndDateDay) {
        this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(gannt.ForcastDay);
        this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - gannt.ForcastDay);

        this.ProgressBarCapacity = this.getValuePercentageInYear(EndProgressBar - StartProgressBar)

        this.EndDateStartPosition = this.getValuePercentageInYear(EndProgressBar);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.ForcastDay - EndProgressBar);

      }

    }
    //Case no forcasting 
    else {

      //If there is no Actual end in the time period selected the color will take the whole bar till the end date
      if (gannt.ActualEndDateDay == 0) {

        this.EndDateStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
        var endDateStartPosition = StartProgressBar + this.calculateProgressWidth(gannt.Progress,
          StartProgressBar, gannt.EndDateDay);

        this.EndDateStartPosition = this.getValuePercentageInYear(endDateStartPosition);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - endDateStartPosition);

        this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          StartProgressBar, gannt.EndDateDay))
        console.log(" no actual end date ProgressBarCapacity till the end date ", this.ProgressBarCapacity)

      }
      else if (gannt.ActualEndDateDay >= gannt.EndDateDay) {

        this.EndDateStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.ActualEndDateDay - gannt.EndDateDay);
        this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          StartProgressBar, gannt.EndDateDay))
      }

      else if (gannt.ActualEndDateDay < gannt.EndDateDay) {
        this.EndDateStartPosition = this.getValuePercentageInYear(gannt.ActualEndDateDay);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - gannt.ActualEndDateDay);
        this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          StartProgressBar, gannt.ActualEndDateDay))
      }
    }


    this.calculateGanttStatusColor(gannt);

  }

  calculateGanttStatusColor(gannt: Gantt): any {

    if (gannt.ActualStartDateDay == 0) {
      this.StartActualDifferenceBarColor = "";
      console.log('empty StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)
    }

    else if (gannt.StartDateDay >= gannt.ActualStartDateDay) {
      this.StartActualDifferenceBarColor = (gannt.Status == 1) ? "#006400" : (gannt.Status == 2) ? "#b78038" : "#7f0000";
      console.log('darker StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)

    }
    else if (gannt.StartDateDay <= gannt.ActualStartDateDay) {
      this.StartActualDifferenceBarColor = (gannt.Status == 1) ? "#d9ecc3" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
      console.log('lighter StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)
    }

    this.ProgressBarColor = (gannt.Status == 1) ? "#7fbe35" : (gannt.Status == 2) ? "#e5a046" : "#D54147";

    if (gannt.EndDateDay <= gannt.ActualEndDateDay) {
      this.EndDateBarColor = (gannt.Status == 1) ? "#006400" : (gannt.Status == 2) ? "#b78038" : "#7f0000";
      console.log('darker EndDateBarColor', this.EndDateBarColor)

    }

    else if (gannt.ForcastDay == 0 && gannt.ActualEndDateDay == 0) {
      //Grey
      this.EndDateBarColor = (gannt.Status == 1) ? "#D3D3D3" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
      console.log('grey EndDateBarColor', this.EndDateBarColor)
    }
    else if (gannt.EndDateDay > gannt.ActualEndDateDay && gannt.ForcastDay == 0) {
      this.EndDateBarColor = (gannt.Status == 1) ? "#d9ecc3" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
      console.log('ligter EndDateBarColor', this.EndDateBarColor)
    }

    else if (gannt.ForcastDay > 0) {


      this.ForcastedEndDateBarColor = (gannt.Status == 1) ? "#ababab" : (gannt.Status == 2) ? "#f4d9b5" : "#7f0000";

      if (this.EndProgress > gannt.EndDateDay) {
        this.EndDateBarColor = (gannt.Status == 1) ? "#324c15" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
        console.log('dark EndDateBarColor', this.EndDateBarColor)
      }
      else if (this.EndProgress < gannt.EndDateDay && gannt.ForcastDay > gannt.EndDateDay) {
        this.EndDateBarColor = (gannt.Status == 1) ? "#d9ecc3" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
        console.log('lighter EndDateBarColor', this.EndDateBarColor)
      }
      else if (this.EndProgress < gannt.ForcastDay && gannt.ForcastDay < gannt.EndDateDay) {
        this.EndDateBarColor = (gannt.Status == 1) ? "#2f154c" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
        console.log('darker EndDateBarColor', this.EndDateBarColor)
      }


    }
    this.ForcastedEndDateBarColor = (gannt.Status == 1) ? "#ababab" : (gannt.Status == 2) ? "#f4d9b5" : "#7f0000";

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
