import { Component, OnInit, Input } from '@angular/core';
import { Gantt } from "./gantt.model"
import { GanttBar } from "./barchart/ganttbar.model";

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],
})
export class GanttChartComponent implements OnInit {


  constructor() {
  }

  @Input('gantt') set gantt(gantt) {
    this.fireGantt(gantt);
  }

  CurrentYear: number = 2016;

  Direction: boolean = true;
  //Start Dates Bar (Bar1)
  StartActualDifferenceBarColor: string = "";
  StartActualBarCapacity: number = 0;
  StartActualBarStartPosition: number = 0;
  GanttBarStart: GanttBar = new GanttBar();

  //Progress Bar (Bar2)
  ProgressBarColor: string = "";
  ProgressBarCapacity: number = 0;
  ProgressBarStartPosition: number = 0;
  GanttBarProgress: GanttBar = new GanttBar();


  //Remaining Bar (Bar3)
  EndDateBarColor: string = "";
  EndDateBarCapacity: number = 0;
  EndDateStartPosition: number = 0;
  GanttBarEnd: GanttBar = new GanttBar();

  //Forcasted Bar
  ForcastedEndDateBarColor: string = "";
  ForcastedBarEndDateBarCapacity: number = 0;
  ForcastedBarEndDateBarStartPosition: number = 0;
  GanttBarForcasted: GanttBar = new GanttBar();

  StartProgress: number = 0;
  EndProgress: number = 0;

  ngOnInit() {
  }



  fireGantt(gantt: Gantt): any {
    this.calculateGanttChart(gantt);
    this.calculateGanttStatusColor(gantt);
    this.setGanttBars(gantt);
    this.setGanttRound(gantt);
    this.setGanttArrows(gantt);
  }

  calculateGanttChart(gannt: Gantt): any {
    this.Direction = gannt.Direction;

    if (gannt.ActualStartDateDay == 0) {
      this.ProgressBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      this.StartProgress = gannt.StartDateDay;
      console.log("ProgressBarStartPosition", this.ProgressBarStartPosition);
    }
    else if (gannt.StartDateDay <= gannt.ActualStartDateDay) {
      var startActualDateDiff = gannt.ActualStartDateDay - gannt.StartDateDay;
      this.StartProgress = gannt.ActualStartDateDay;

      this.ProgressBarStartPosition = this.getValuePercentageInYear(gannt.ActualStartDateDay);
      this.StartActualBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      this.StartActualBarCapacity = this.getValuePercentageInYear(startActualDateDiff);

      console.log("actual after start StartActualBarStartPosition", this.StartActualBarStartPosition);
      console.log("actual after start  StartActualBarCapacity", this.StartActualBarCapacity);
      console.log("actual after start  ProgressBarStartPosition", this.ProgressBarStartPosition);
    }

    else if (gannt.StartDateDay >= gannt.ActualStartDateDay) {
      var startEndDateDiff = gannt.StartDateDay - gannt.ActualStartDateDay;
      this.StartProgress = gannt.ActualStartDateDay;

      this.ProgressBarStartPosition = this.getValuePercentageInYear(gannt.StartDateDay);
      this.StartActualBarStartPosition = this.getValuePercentageInYear(gannt.ActualStartDateDay);
      this.StartActualBarCapacity = this.getValuePercentageInYear(startEndDateDiff);

      console.log("start after actual StartActualBarStartPosition", this.StartActualBarStartPosition);
      console.log("start after actual  StartActualBarCapacity", this.StartActualBarCapacity);
      console.log("start after actual  ProgressBarStartPosition", this.ProgressBarStartPosition);
    }


    if (gannt.ForcastDay != 0 && gannt.Progress != 100) {

      var progressCapacity = this.calculateProgressWidth(gannt.Progress, this.StartProgress, gannt.ForcastDay)
      this.EndProgress = this.StartProgress + progressCapacity;

      if (gannt.ForcastDay > gannt.EndDateDay) {

        this.ProgressBarCapacity = this.getValuePercentageInYear(progressCapacity)

        if (this.EndProgress >= gannt.EndDateDay) {
          this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(this.EndProgress);
          this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.ForcastDay - this.EndProgress);

          this.ProgressBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - this.StartProgress)

          this.EndDateStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
          this.EndDateBarCapacity = this.getValuePercentageInYear(this.EndProgress - gannt.EndDateDay);
          console.log('case endprogress bar > end date ', this.ForcastedBarEndDateBarStartPosition)
        }
        else if (this.EndProgress < gannt.EndDateDay) {
          this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
          this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.ForcastDay - gannt.EndDateDay);

          this.ProgressBarCapacity = this.getValuePercentageInYear(this.EndProgress - this.StartProgress)

          this.EndDateStartPosition = this.getValuePercentageInYear(this.EndProgress);
          this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - this.EndProgress);
        }
      }
      else if (gannt.ForcastDay < gannt.EndDateDay) {
        this.ForcastedBarEndDateBarStartPosition = this.getValuePercentageInYear(gannt.ForcastDay);
        this.ForcastedBarEndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - gannt.ForcastDay);

        this.ProgressBarCapacity = this.getValuePercentageInYear(this.EndProgress - this.StartProgress)

        this.EndDateStartPosition = this.getValuePercentageInYear(this.EndProgress);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.ForcastDay - this.EndProgress);

      }

    }
    else {
      if (gannt.ActualEndDateDay == 0) {

        this.EndDateStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
        var endDateStartPosition = this.StartProgress + this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.EndDateDay);

        this.EndDateStartPosition = this.getValuePercentageInYear(endDateStartPosition);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - endDateStartPosition);

        this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.EndDateDay))
        console.log(" no actual end date ProgressBarCapacity till the end date ", this.ProgressBarCapacity)

      }
      else if (gannt.ActualEndDateDay >= gannt.EndDateDay) {

        this.EndDateStartPosition = this.getValuePercentageInYear(gannt.EndDateDay);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.ActualEndDateDay - gannt.EndDateDay);
        this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.EndDateDay))
      }

      else if (gannt.ActualEndDateDay < gannt.EndDateDay) {
        this.EndDateStartPosition = this.getValuePercentageInYear(gannt.ActualEndDateDay);
        this.EndDateBarCapacity = this.getValuePercentageInYear(gannt.EndDateDay - gannt.ActualEndDateDay);
        this.ProgressBarCapacity = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.ActualEndDateDay))
      }
    }


    this.calculateGanttStatusColor(gannt);
    this.setGanttBars(gannt);
  }

  calculateGanttStatusColor(gannt: Gantt): any {

    if (gannt.ActualStartDateDay == 0) {
      this.StartActualDifferenceBarColor = "";
      console.log('empty StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)
    }

    else if (gannt.StartDateDay >= gannt.ActualStartDateDay) {
      this.StartActualDifferenceBarColor = (gannt.Status == 1) ? "#588325" : (gannt.Status == 2) ? "#ac6313" : "#b93938";
      console.log('darker StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)

    }
    else if (gannt.StartDateDay <= gannt.ActualStartDateDay) {
      this.StartActualDifferenceBarColor = (gannt.Status == 1) ? "#d9ecc3" : (gannt.Status == 2) ? "#f4d9b5" : "#ffc5c7";
      console.log('lighter StartActualDifferenceBarColor', this.StartActualDifferenceBarColor)
    }

    this.ProgressBarColor = (gannt.Status == 1) ? "#7fbe35" : (gannt.Status == 2) ? "#f99a30" : "#ff3f40";

    if (gannt.EndDateDay < gannt.ActualEndDateDay) {
      this.EndDateBarColor = (gannt.Status == 1) ? "#588325" : (gannt.Status == 2) ? "#ac6313" : "#b93938";
      console.log('darker EndDateBarColor', this.EndDateBarColor)

    }
    else if (gannt.ForcastDay == 0 && gannt.ActualEndDateDay == 0) {
      //Grey
      this.EndDateBarColor = (gannt.Status == 1) ? "#cfcfcf" : (gannt.Status == 2) ? "#cfcfcf" : "#cfcfcf";
      console.log('grey EndDateBarColor', this.EndDateBarColor)
    }
    else if (gannt.EndDateDay > gannt.ActualEndDateDay && gannt.ForcastDay == 0) {
      this.EndDateBarColor = (gannt.Status == 1) ? "#d9ecc3" : (gannt.Status == 2) ? "#fccd97" : "#ffc5c7";
      console.log('ligter EndDateBarColor', this.EndDateBarColor)
    }

    else if (gannt.ForcastDay != 0) {


      this.ForcastedEndDateBarColor = (gannt.Status == 1) ? "#ababab" : (gannt.Status == 2) ? "#f4d9b5" : "#7f0000";

      if (this.EndProgress > gannt.EndDateDay) {
        this.EndDateBarColor = (gannt.Status == 1) ? "#324c15" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
        console.log('dark EndDateBarColor', this.EndDateBarColor)
      }
      else if (this.EndProgress < gannt.EndDateDay && gannt.ForcastDay > gannt.EndDateDay) {
        this.EndDateBarColor = (gannt.Status == 1) ? "#cfcfcf" : (gannt.Status == 2) ? "#cfcfcf" : "#cfcfcf";
        console.log('lighter EndDateBarColor', this.EndDateBarColor)
      }
      else if (this.EndProgress < gannt.ForcastDay && gannt.ForcastDay < gannt.EndDateDay) {
        this.EndDateBarColor = (gannt.Status == 1) ? "#cfcfcf" : (gannt.Status == 2) ? "#cfcfcf" : "#cfcfcf";
        console.log('darker EndDateBarColor', this.EndDateBarColor)
      }
      if (this.EndProgress < gannt.ForcastDay && gannt.ForcastDay < gannt.EndDateDay)
        this.ForcastedEndDateBarColor = (gannt.Status == 1) ? "#dedede" : (gannt.Status == 2) ? "#dedede" : "#dedede";
      else
        this.ForcastedEndDateBarColor = (gannt.Status == 1) ? "#ababab" : (gannt.Status == 2) ? "#ababab" : "#ababab";
    }




  }

  setGanttBars(gannt: Gantt): any {
    //Here we need to add logic for each bar to round and set arrows + Tooltip
    this.GanttBarStart.position = this.StartActualBarStartPosition;
    this.GanttBarStart.width = this.StartActualBarCapacity;
    this.GanttBarStart.color = this.StartActualDifferenceBarColor;
    this.GanttBarStart.direction = this.Direction;
    this.GanttBarStart.barType = "start";

    this.GanttBarProgress.position = this.ProgressBarStartPosition;
    this.GanttBarProgress.width = this.ProgressBarCapacity;
    this.GanttBarProgress.color = this.ProgressBarColor;
    this.GanttBarProgress.barType = "progress";
    this.GanttBarProgress.direction = this.Direction;

    this.GanttBarEnd.position = this.EndDateStartPosition;
    this.GanttBarEnd.width = this.EndDateBarCapacity;
    this.GanttBarEnd.color = this.EndDateBarColor;
    this.GanttBarEnd.barType = "end";
    this.GanttBarEnd.direction = this.Direction;

    this.GanttBarForcasted.position = this.ForcastedBarEndDateBarStartPosition;
    this.GanttBarForcasted.width = this.ForcastedBarEndDateBarCapacity;
    this.GanttBarForcasted.color = this.ForcastedEndDateBarColor;
    this.GanttBarForcasted.barType = "forcasted";
    this.GanttBarForcasted.direction = this.Direction;


  }

  setGanttRound(gantt: Gantt): any {
    this.GanttBarStart.roundDirecton = "left";

    this.GanttBarForcasted.roundDirecton = "right";
  }

  setGanttArrows(gannt: Gantt): any {
    this.GanttBarStart.arrowDirection = "left";
    this.GanttBarForcasted.arrowDirection = "right";


  }


  getValuePercentageInYear(value: number): number {
    return ((value * 100) / 365);
  }

  calculateProgressWidth(progress: number, start: number, end: number): any {
    // console.log('progress,start,end', progress, start, end)
    var capacity = end - start;
    var progress = ((progress * capacity) / 100) //+ start
    //  console.log('prgress', progress);
    return progress;

  }


}
