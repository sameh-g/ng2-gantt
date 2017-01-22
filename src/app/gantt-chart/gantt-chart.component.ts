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
    this.Gantt = gantt;
    this.fireGantt(this.Gantt);
  }
  
  StartProgress: number = 0;
  EndProgress: number = 0;


  Gantt: Gantt;
  ngOnInit() {
  }



  fireGantt(gantt: Gantt): any {

    this.calculateGanttChart(gantt);
    this.calculateGanttStatusColor(gantt);
    this.setGanttBars(gantt);
    this.setGanttRound(gantt);
    this.setGanttArrows(gantt);
    console.log(gantt)
  }

  calculateGanttChart(gannt: Gantt): any {

    if (gannt.ActualStartDateDay == 0) {
      gannt.GanttBarProgress.position = this.getValuePercentageInYear(gannt.StartDateDay);
      this.StartProgress = gannt.StartDateDay;
      console.log("ProgressBarStartPosition", gannt.GanttBarProgress.position);
    }
    else if (gannt.StartDateDay <= gannt.ActualStartDateDay) {
      var startActualDateDiff = gannt.ActualStartDateDay - gannt.StartDateDay;
      this.StartProgress = gannt.ActualStartDateDay;

      gannt.GanttBarProgress.position = this.getValuePercentageInYear(gannt.ActualStartDateDay);
      gannt.GanttBarStart.position = this.getValuePercentageInYear(gannt.StartDateDay);
      gannt.GanttBarStart.width = this.getValuePercentageInYear(startActualDateDiff);

      console.log("actual after start StartActualBarStartPosition", gannt.GanttBarStart.position);
      console.log("actual after start  StartActualBarCapacity", gannt.GanttBarStart.width);
      console.log("actual after start  ProgressBarStartPosition", gannt.GanttBarProgress.position);
    }

    else if (gannt.StartDateDay >= gannt.ActualStartDateDay) {
      var startEndDateDiff = gannt.StartDateDay - gannt.ActualStartDateDay;
      this.StartProgress = gannt.ActualStartDateDay;

      gannt.GanttBarProgress.position = this.getValuePercentageInYear(gannt.StartDateDay);
      gannt.GanttBarStart.position = this.getValuePercentageInYear(gannt.ActualStartDateDay);
      gannt.GanttBarStart.width = this.getValuePercentageInYear(startEndDateDiff);

      console.log("start after actual StartActualBarStartPosition", gannt.GanttBarStart.position);
      console.log("start after actual  StartActualBarCapacity", gannt.GanttBarStart.width);
      console.log("start after actual  ProgressBarStartPosition", gannt.GanttBarProgress.position);
    }


    if (gannt.ForcastDay != 0 && gannt.Progress != 100) {

      var progressCapacity = this.calculateProgressWidth(gannt.Progress, this.StartProgress, gannt.ForcastDay)
      this.EndProgress = this.StartProgress + progressCapacity;

      if (gannt.ForcastDay > gannt.EndDateDay) {

        gannt.GanttBarProgress.width = this.getValuePercentageInYear(progressCapacity)

        if (this.EndProgress >= gannt.EndDateDay) {
          gannt.GanttBarForcasted.position = this.getValuePercentageInYear(this.EndProgress);
          gannt.GanttBarForcasted.width = this.getValuePercentageInYear(gannt.ForcastDay - this.EndProgress);

          gannt.GanttBarProgress.width = this.getValuePercentageInYear(gannt.EndDateDay - this.StartProgress)

          gannt.GanttBarEnd.position = this.getValuePercentageInYear(gannt.EndDateDay);
          gannt.GanttBarEnd.width = this.getValuePercentageInYear(this.EndProgress - gannt.EndDateDay);
          console.log('case endprogress bar > end date ', gannt.GanttBarForcasted.position)
        }
        else if (this.EndProgress < gannt.EndDateDay) {
          gannt.GanttBarForcasted.position = this.getValuePercentageInYear(gannt.EndDateDay);
          gannt.GanttBarForcasted.width = this.getValuePercentageInYear(gannt.ForcastDay - gannt.EndDateDay);

          gannt.GanttBarProgress.width = this.getValuePercentageInYear(this.EndProgress - this.StartProgress)

          gannt.GanttBarEnd.position = this.getValuePercentageInYear(this.EndProgress);
          gannt.GanttBarEnd.width = this.getValuePercentageInYear(gannt.EndDateDay - this.EndProgress);
        }
      }
      else if (gannt.ForcastDay < gannt.EndDateDay) {
        gannt.GanttBarForcasted.position = this.getValuePercentageInYear(gannt.ForcastDay);
        gannt.GanttBarForcasted.width = this.getValuePercentageInYear(gannt.EndDateDay - gannt.ForcastDay);

        gannt.GanttBarProgress.width = this.getValuePercentageInYear(this.EndProgress - this.StartProgress)

        gannt.GanttBarEnd.position = this.getValuePercentageInYear(this.EndProgress);
        gannt.GanttBarEnd.width = this.getValuePercentageInYear(gannt.ForcastDay - this.EndProgress);

      }

    }
    else {
      if (gannt.ActualEndDateDay == 0) {

        gannt.GanttBarEnd.position = this.getValuePercentageInYear(gannt.EndDateDay);
        var endDateStartPosition = this.StartProgress + this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.EndDateDay);

        gannt.GanttBarEnd.position = this.getValuePercentageInYear(endDateStartPosition);
        gannt.GanttBarEnd.width = this.getValuePercentageInYear(gannt.EndDateDay - endDateStartPosition);

        gannt.GanttBarProgress.width = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.EndDateDay))
        console.log(" no actual end date ProgressBarCapacity till the end date ", gannt.GanttBarProgress.width)

      }
      else if (gannt.ActualEndDateDay >= gannt.EndDateDay) {

        gannt.GanttBarEnd.position = this.getValuePercentageInYear(gannt.EndDateDay);
        gannt.GanttBarEnd.width = this.getValuePercentageInYear(gannt.ActualEndDateDay - gannt.EndDateDay);
        gannt.GanttBarProgress.width = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.EndDateDay))
      }

      else if (gannt.ActualEndDateDay < gannt.EndDateDay) {
        gannt.GanttBarEnd.position = this.getValuePercentageInYear(gannt.ActualEndDateDay);
        gannt.GanttBarEnd.width = this.getValuePercentageInYear(gannt.EndDateDay - gannt.ActualEndDateDay);
        gannt.GanttBarProgress.width = this.getValuePercentageInYear(this.calculateProgressWidth(gannt.Progress,
          this.StartProgress, gannt.ActualEndDateDay))
      }
    }

  }

  calculateGanttStatusColor(gannt: Gantt): any {

    if (gannt.ActualStartDateDay == 0) {
      gannt.GanttBarStart.color = "";
      console.log('empty StartActualDifferenceBarColor', gannt.GanttBarStart.color)
    }

    else if (gannt.StartDateDay >= gannt.ActualStartDateDay) {
      gannt.GanttBarStart.color = (gannt.Status == 1) ? "#588325" : (gannt.Status == 2) ? "#ac6313" : "#b93938";
      console.log('darker StartActualDifferenceBarColor', gannt.GanttBarStart.color)

    }
    else if (gannt.StartDateDay <= gannt.ActualStartDateDay) {
      gannt.GanttBarStart.color = (gannt.Status == 1) ? "#d9ecc3" : (gannt.Status == 2) ? "#f4d9b5" : "#ffc5c7";
      console.log('lighter StartActualDifferenceBarColor', gannt.GanttBarStart.color)
    }

    gannt.GanttBarProgress.color = (gannt.Status == 1) ? "#7fbe35" : (gannt.Status == 2) ? "#f99a30" : "#ff3f40";

     if (gannt.ForcastDay == 0 && gannt.ActualEndDateDay == 0) {
      //Grey
      gannt.GanttBarEnd.color = (gannt.Status == 1) ? "#cfcfcf" : (gannt.Status == 2) ? "#cfcfcf" : "#cfcfcf";
      console.log('grey EndDateBarColor', gannt.GanttBarEnd.color)
    }
    else if (gannt.EndDateDay < gannt.ActualEndDateDay) {
      gannt.GanttBarEnd.color = (gannt.Status == 1) ? "#588325" : (gannt.Status == 2) ? "#ac6313" : "#b93938";
      console.log('darker EndDateBarColor', gannt.GanttBarEnd.color)

    }

    else if (gannt.EndDateDay > gannt.ActualEndDateDay && gannt.ForcastDay == 0) {
      gannt.GanttBarEnd.color = (gannt.Status == 1) ? "#d9ecc3" : (gannt.Status == 2) ? "#fccd97" : "#ffc5c7";
      console.log('ligter EndDateBarColor', gannt.GanttBarEnd.color)
    }

    if (gannt.ForcastDay != 0) {
      console.log('gannt bar forcasted color ', gannt.GanttBarForcasted.color);

      gannt.GanttBarForcasted.color = (gannt.Status == 1) ? "#ababab" : (gannt.Status == 2) ? "#f4d9b5" : "#7f0000";

      if (this.EndProgress > gannt.EndDateDay) {
        gannt.GanttBarEnd.color = (gannt.Status == 1) ? "#324c15" : (gannt.Status == 2) ? "#f4d9b5" : "#FA8072";
        console.log('dark EndDateBarColor', gannt.GanttBarEnd.color)
      }
      else if (this.EndProgress < gannt.EndDateDay && gannt.ForcastDay > gannt.EndDateDay) {
        gannt.GanttBarEnd.color = (gannt.Status == 1) ? "#cfcfcf" : (gannt.Status == 2) ? "#cfcfcf" : "#cfcfcf";
        console.log('lighter EndDateBarColor', gannt.GanttBarEnd.color)
      }
      else if (this.EndProgress < gannt.ForcastDay && gannt.ForcastDay < gannt.EndDateDay) {
        gannt.GanttBarEnd.color = (gannt.Status == 1) ? "#cfcfcf" : (gannt.Status == 2) ? "#cfcfcf" : "#cfcfcf";
        console.log('darker EndDateBarColor', gannt.GanttBarEnd.color)
      }
      if (this.EndProgress < gannt.ForcastDay && gannt.ForcastDay < gannt.EndDateDay)
        gannt.GanttBarForcasted.color = (gannt.Status == 1) ? "#dedede" : (gannt.Status == 2) ? "#dedede" : "#dedede";
      else
        gannt.GanttBarForcasted.color = (gannt.Status == 1) ? "#ababab" : (gannt.Status == 2) ? "#ababab" : "#ababab";
    }




  }

  setGanttBars(gannt: Gantt): any {

    gannt.GanttBarStart.direction = gannt.Direction;
    gannt.GanttBarStart.barType = "start";
    
    gannt.GanttBarStart.leftArrowData="  Start Date  "+ gannt.StartDateFormated;
    gannt.GanttBarStart.rightArrowData=" Actual Start Date  "+ gannt.ActualStartDateFormated;
    
    gannt.GanttBarProgress.barType = "progress";
    gannt.GanttBarProgress.direction = gannt.Direction;
    gannt.GanttBarProgress.barData=gannt.Progress.toString()+"%"

    gannt.GanttBarEnd.barType = "end";
    gannt.GanttBarEnd.direction = gannt.Direction;
    gannt.GanttBarEnd.rightArrowData="  End Date  "+ gannt.ActualEndDateFormated;

    gannt.GanttBarForcasted.barType = "forcasted";
    gannt.GanttBarForcasted.direction = gannt.Direction;
    gannt.GanttBarForcasted.rightArrowData="  forcasted Date  "+ gannt.ForcastedDateFormated;


  }

  setGanttRound(gannt: Gantt): any {
    var left = "left"
    var right = "right"
    if (gannt.Direction) {
      left = "right"
      right = "left"
    }

    gannt.GanttBarStart.roundDirecton = left;
    gannt.GanttBarForcasted.roundDirecton = right;

    if (gannt.GanttBarStart.width == 0 && gannt.GanttBarEnd.width == 0 && gannt.GanttBarForcasted.width == 0)
      gannt.GanttBarProgress.roundDirecton = "both";

    else if (gannt.GanttBarStart.width == 0)
      gannt.GanttBarProgress.roundDirecton = left;

    if (gannt.GanttBarForcasted.width == 0)
      gannt.GanttBarEnd.roundDirecton = right;
    else
      gannt.GanttBarForcasted.roundDirecton = right;

  }

  setGanttArrows(gannt: Gantt): any {
    var left = "left"
    var right = "right"
    if (gannt.Direction) {
      left = "right"
      right = "left"
    }

    gannt.GanttBarStart.arrowDirection = left;
    gannt.GanttBarProgress.arrowDirection = left;
    gannt.GanttBarEnd.arrowDirection = right;
    gannt.GanttBarForcasted.arrowDirection = "both";

    //Special cases 
    if (gannt.Progress == 100) {
      gannt.GanttBarProgress.arrowDirection = "both";
      gannt.GanttBarEnd.arrowDirection = "both";
    }



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
